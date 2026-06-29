import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const TIER_1_CITIES = ['Mumbai', 'Delhi', 'New Delhi', 'Bangalore', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune'];
const TIER_2_CITIES = ['Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Prayagraj', 'Howrah', 'Ranchi', 'Gwalior', 'Jabalpur', 'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Chandigarh', 'Guwahati', 'Solapur', 'Hubli', 'Dharwad', 'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon', 'Gurugram', 'Aligarh', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Warangal', 'Thiruvananthapuram', 'Noida', 'Kochi'];

function getCityCategory(city: string | null, country: string | null): string {
  if (country && country !== 'India') return 'International';
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
    let country = null;

    try {
      // Use a dummy IP if local, otherwise use the real IP
      const lookupIp = (ip === '127.0.0.1' || ip === '::1') ? '122.161.73.195' : ip;
      
      // We use ip-api.com to avoid the 66MB mmdb file on Vercel
      // This is a free, fast, no-auth API for server-to-server IP resolution
      const geoRes = await fetch(`http://ip-api.com/json/${lookupIp}`);
      
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        if (geoData.status === 'success') {
          state = geoData.regionName;
          city = geoData.city;
          country = geoData.country;
        }
      }
    } catch (geoipError) {
      console.log("GeoIP API Error:", geoipError);
    }

    const cityCategory = getCityCategory(city, country);
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
