import Link from 'next/link';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoTiktok, IoLogoReddit } from 'react-icons/io5';

export default function LeftNav() {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-8 text-red-800'>
      <Link
        href='https://www.instagram.com/gimmesum_clothing'
        target='_blank'
        className='hover:text-red-500 transition-colors'
      >
        <IoLogoInstagram className='text-xl' />
      </Link>
      <Link
        href='https://www.tiktok.com/@gimmesum_clothing'
        target='_blank'
        className='hover:text-red-500 transition-colors'
      >
        <IoLogoTiktok className='text-xl' />
      </Link>
      <Link
        href='https://www.reddit.com/r/gimmesum_clothing'
        target='_blank'
        className='hover:text-red-500 transition-colors'
      >
        <IoLogoReddit className='text-xl' />
      </Link>
    </div>
  );
}
