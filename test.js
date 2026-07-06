const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const jobs = await prisma.job.findMany();
    console.log("Jobs:", jobs.length);
    if (jobs.length > 0) {
      const job = jobs[0];
      console.log("Found job:", job.id);
      
      // Attempt delete manually
      await prisma.application.deleteMany({ where: { jobId: job.id }});
      await prisma.job.delete({ where: { id: job.id }});
      console.log("Deleted job successfully");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
