import os
import csv
import re
from datetime import datetime
try:
    import psycopg2
    from psycopg2.extras import execute_batch
except ImportError:
    print("Please install psycopg2-binary first: pip install psycopg2-binary")
    exit(1)

# Load database URL directly or from .env
# Using the direct URL for Supabase
DB_URL = "postgresql://postgres.tszrkdrzxozqyjvyiyec:Ved%40Upskilling@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"

def main():
    csv_file = "blast - Sheet1.csv"
    
    if not os.path.exists(csv_file):
        print(f"Error: Could not find {csv_file} in this folder.")
        return

    print("Connecting to database...")
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
    except Exception as e:
        print("Failed to connect to database:", e)
        return

    # 1. Create the table exactly as Prisma expects it
    print("Ensuring CampaignLead table exists...")
    create_table_query = """
    CREATE TABLE IF NOT EXISTS "CampaignLead" (
        "id" SERIAL PRIMARY KEY,
        "phone" TEXT NOT NULL UNIQUE,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "name" TEXT,
        "email" TEXT,
        "internshipInterest" TEXT,
        "lastContactedAt" TIMESTAMP(3) WITHOUT TIME ZONE,
        "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    """
    cur.execute(create_table_query)
    conn.commit()

    # 2. Read and parse CSV
    print("Reading CSV and parsing numbers...")
    valid_numbers = set()
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            for cell in row:
                # Keep only digits and plus signs
                clean_number = re.sub(r'[^0-9+]', '', str(cell).strip())
                if len(clean_number) >= 10:
                    valid_numbers.add(clean_number)

    if not valid_numbers:
        print("No valid phone numbers found in the CSV.")
        return

    print(f"Found {len(valid_numbers)} unique phone numbers to import.")

    # 3. Insert into Database
    insert_query = """
        INSERT INTO "CampaignLead" ("phone", "status", "updatedAt") 
        VALUES (%s, 'PENDING', %s) 
        ON CONFLICT ("phone") DO NOTHING;
    """
    
    now = datetime.utcnow()
    records = [(phone, now) for phone in valid_numbers]
    
    print("Uploading to Supabase... This might take a few seconds.")
    execute_batch(cur, insert_query, records, page_size=100)
    conn.commit()
    
    print(f"\nSuccess! All leads have been imported into the database.")
    
    cur.close()
    conn.close()

if __name__ == "__main__":
    main()
