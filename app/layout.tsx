import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'gimmesum',
  description: 'gimmesum',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='bg-orange-100 bg-opacity-35'>
      <body>{children}</body>
    </html>
  );
}
