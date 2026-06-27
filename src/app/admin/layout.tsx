import React from 'react';

export const metadata = {
  title: 'Admin Analytics Portal - Ved Upskilling',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E6C875] selection:text-black">
      {children}
    </div>
  );
}
