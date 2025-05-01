import Link from 'next/link';
import SubscribeForm from './components/SubscribeForm';

export default function Footer() {
  return (
    <footer className='w-full mt-12 p-4 grid grid-cols-3 gap-4'>
      <div></div>
      <SubscribeForm />
      <div className='flex items-center justify-center gap-4 justify-self-end'>
        <Link
          href='/privacy-policy'
          className='text-sm text-red-800 hover:text-red-500 transition-colors'
        >
          privacy policy
        </Link>
        <Link
          href='/terms-of-service'
          className='text-sm text-red-800 hover:text-red-500 transition-colors'
        >
          terms of service
        </Link>
        <Link
          href='/sign-in'
          className='text-sm text-red-800 hover:text-red-500 transition-colors'
        >
          admin
        </Link>
      </div>
    </footer>
  );
}
