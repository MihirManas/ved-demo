import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Reader } from '@maxmind/geoip2-node';
import path from 'path';
import fs from 'fs';

let reader: Reader | null = null;

async function getGeoReader() {
  if (reader) return reader;
  try {
    const dbPath = path.join(process.cwd(), 'GeoLite2-City.mmdb');
    if (fs.existsSync(dbPath)) {
      reader = await Reader.open(dbPath);
    }
  } catch (error) {
    console.error('Failed to load MaxMind database', error);
  }
  return reader;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pathname, referrer, userAgent, screenResolution } = body;

    // Get IP address
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';

    // Vercel built-in Edge headers (Works perfectly on Vercel deployment)
    const vercelCity = req.headers.get('x-vercel-ip-city');
    const vercelState = req.headers.get('x-vercel-ip-country-region');

    let city = vercelCity ? decodeURIComponent(vercelCity) : 'Unknown';
    let state = vercelState ? decodeURIComponent(vercelState) : 'Unknown';
    let tier = 'Unknown';

    // Attempt MaxMind GeoIP lookup ONLY if Vercel headers fail (for future AWS migration)
    if (city === 'Unknown' || state === 'Unknown') {
      const geoReader = await getGeoReader();
      if (geoReader && ip !== '127.0.0.1' && ip !== '::1') {
        try {
          // @ts-ignore: Bypass 'Property does not exist on type Reader' error
          const response = (geoReader as any).city(ip);
          city = response.city?.names.en || city;
          state = response.subdivisions?.[0]?.names.en || state;
        } catch (error) {
          console.error("GeoIP lookup failed:", error);
        }
      }
    }

    // Tier Classification (Basic Example)
    const tier1Cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];
    if (tier1Cities.includes(city)) tier = 'Tier 1';
    else if (city !== 'Unknown') tier = 'Tier 2/3';

    // Insert into DB
    // We swallow errors here so we don't break the client if DB is down
    query(
      `INSERT INTO page_views (pathname, ip_address, city, state, tier, device, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [pathname, ip, city, state, tier, userAgent]
    ).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
