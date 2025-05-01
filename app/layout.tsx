import type { Metadata } from 'next';
import './globals.css';
import { Iceland } from 'next/font/google';
import Navbar from './components/navs/Navbar';
import LeftNav from './components/navs/LeftNav';
import Footer from './components/navs/Footer';

const iceland = Iceland({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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
    <html lang='en' className={iceland.className}>
      <body className='relative min-h-screen flex flex-col'>
        <div
          className='fixed inset-0 bg-[url(/images/paper.jpg)] bg-center bg-cover bg-no-repeat opacity-30'
          style={{ zIndex: -1 }}
        />
        <div
          className='fixed bottom-0 left-0 right-0 h-[400px] bg-[url(/images/lotus.png)] bg-bottom bg-no-repeat bg-contain opacity-20'
          style={{ zIndex: -1 }}
        />
        <Navbar />
        <div className='h-[calc(100vh-44px)] p-2 fixed top-0 left-0'>
          <LeftNav />
        </div>
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
