import { NextRequest, NextResponse } from 'next/server';
import { Reader } from '@maxmind/geoip2-node';
import prisma from '@/lib/prisma';
import path from 'path';

const TIER_1_CITIES = ['Mumbai', 'Delhi', 'New Delhi', 'Bangalore', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune'];
const TIER_2_CITIES = ['Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Prayagraj', 'Howrah', 'Ranchi', 'Gwalior', 'Jabalpur', 'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Chandigarh', 'Guwahati', 'Solapur', 'Hubli', 'Dharwad', 'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon', 'Gurugram', 'Aligarh', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Warangal', 'Thiruvananthapuram', 'Noida', 'Kochi'];

function getCityCategory(city: string | null): string {
  if (!city) return 'Other';
  if (TIER_1_CITIES.includes(city)) return 'Tier 1';
  if (TIER_2_CITIES.includes(city)) return 'Tier 2';
  return 'Tier 3';
}

function getTrafficSource(referer: string | null, userAgent: string | null): string {
  if (referer) {
    const lowerRef = referer.toLowerCase();
    if (lowerRef.includes('instagram.com')) return 'Instagram';
    if (lowerRef.includes('facebook.com')) return 'Facebook';
    if (lowerRef.includes('google.com')) return 'Google';
    if (lowerRef.includes('twitter.com') || lowerRef.includes('t.co')) return 'Twitter';
    if (lowerRef.includes('whatsapp.com')) return 'WhatsApp';
    if (lowerRef.includes('linkedin.com')) return 'LinkedIn';
  }
  
  if (userAgent) {
    const lowerUa = userAgent.toLowerCase();
    if (lowerUa.includes('instagram')) return 'Instagram App';
    if (lowerUa.includes('fbav') || lowerUa.includes('fban')) return 'Facebook App';
    if (lowerUa.includes('whatsapp')) return 'WhatsApp';
  }

  return 'Direct / Browser (e.g., Chrome)';
}

export async function POST(req: NextRequest) {
  try {
    // Attempt to get client IP
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : req.headers.get('x-real-ip') || '127.0.0.1';
    
    const referer = req.headers.get('referer');
    const userAgent = req.headers.get('user-agent');
    
    let state = null;
    let city = null;

    try {
      // In a real deployed Next.js app, finding the mmdb file path might be tricky.
      // process.cwd() usually points to the root of the project.
      const dbPath = path.join(process.cwd(), 'GeoLite2-City.mmdb');
      
      const reader = await Reader.open(dbPath);
      // '122.161.73.195' is a dummy IP for testing (Delhi, India) 
      // If localhost (127.0.0.1 or ::1), we use a dummy IP so we get some data locally.
      const lookupIp = (ip === '127.0.0.1' || ip === '::1') ? '122.161.73.195' : ip;
      
      const response = reader.city(lookupIp);
      
      if (response.subdivisions && response.subdivisions.length > 0) {
        state = response.subdivisions[0].names.en;
      }
      if (response.city && response.city.names) {
        city = response.city.names.en;
      }
    } catch (geoipError) {
      console.log("GeoIP Error (could be a local IP or missing DB):", geoipError);
    }

    const cityCategory = getCityCategory(city);
    const source = getTrafficSource(referer, userAgent);

    // Save to database
    await prisma.trafficLog.create({
      data: {
        source,
        state,
        cityCategory,
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Tracking error:", error);
    // Fail silently for tracking
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
