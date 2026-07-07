import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import readline from 'readline';

const prisma = new PrismaClient();

async function importCSV() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('Please provide a path to the CSV file as an argument.');
    console.error('Usage: npx ts-node scripts/importLeads.ts path/to/leads.csv');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  let duplicates = 0;
  
  console.log('Starting import...');

  for await (const line of rl) {
    // The CSV has numbers in multiple columns. Split by comma.
    const columns = line.split(',');

    for (const col of columns) {
      const rawText = col.trim();
      // Only keep digits and plus signs
      const cleanNumber = rawText.replace(/[^0-9+]/g, '');

      // Check if it's a valid phone number (at least 10 digits)
      if (cleanNumber.length >= 10) {
        try {
          await prisma.campaignLead.create({
            data: {
              phone: cleanNumber,
              status: 'PENDING'
            }
          });
          count++;
          if (count % 100 === 0) {
            console.log(`Imported ${count} leads...`);
          }
        } catch (e: any) {
          // Prisma throws P2002 on unique constraint violation (duplicate phone)
          if (e.code === 'P2002') {
            duplicates++;
          } else {
            console.error(`Error inserting ${cleanNumber}:`, e.message);
          }
        }
      }
    }
  }

  console.log(`\nImport complete!`);
  console.log(`Successfully added: ${count} leads`);
  console.log(`Skipped (duplicates): ${duplicates} leads`);
  
  await prisma.$disconnect();
}

importCSV().catch(console.error);
