import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#E6C875',
          borderRadius: '6px',
          fontWeight: 700,
          fontFamily: 'sans-serif',
          letterSpacing: '-1px'
        }}
      >
        V/
      </div>
    ),
    { ...size }
  );
}
