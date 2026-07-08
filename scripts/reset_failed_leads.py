import os
import urllib.parse
from datetime import datetime
try:
    import psycopg2
except ImportError:
    print("Please install psycopg2-binary first: pip install psycopg2-binary")
    exit(1)

def main():
    db_url = "postgresql://postgres.tszrkdrzxozqyjvyiyec:Ved%40Upskilling@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"

    # Parse connection string
    parsed = urllib.parse.urlparse(db_url)
    user = parsed.username
    password = parsed.password
    host = parsed.hostname
    port = parsed.port
    dbname = parsed.path.lstrip('/')

    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port,
            sslmode='require'
        )
        cur = conn.cursor()

        # Reset IDs 4 through 50 back to PENDING since they were the ones that failed
        # IDs 1, 2, 3 were successfully delivered.
        cur.execute("""
            UPDATE "CampaignLead"
            SET status = 'PENDING', "lastContactedAt" = NULL
            WHERE id >= 4 AND id <= 50;
        """)
        
        updated_rows = cur.rowcount
        conn.commit()
        
        print(f"Successfully reset {updated_rows} leads back to PENDING.")
        
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Database error: {e}")

if __name__ == "__main__":
    main()
