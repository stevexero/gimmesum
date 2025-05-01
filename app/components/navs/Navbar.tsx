'use client';

import Link from 'next/link';
import { IoBagOutline } from 'react-icons/io5';

export default function Navbar() {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 px-2 py-0'>
      <div className='mx-auto flex justify-between items-center text-xs text-red-800'>
        <Link
          href='/'
          className='text-xl group cursor-pointer leading-none flex items-center'
        >
          <span className='inline-block'>G</span>
          <span className='inline-block max-w-0 overflow-hidden opacity-0 group-hover:max-w-[1em] group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'>
            i
          </span>
          <span className='inline-block max-w-0 overflow-hidden opacity-0 group-hover:max-w-[1em] group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] delay-50'>
            m
          </span>
          <span className='inline-block max-w-0 overflow-hidden opacity-0 group-hover:max-w-[1em] group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] delay-100'>
            m
          </span>
          <span className='inline-block max-w-0 overflow-hidden opacity-0 group-hover:max-w-[1em] group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] delay-150'>
            e
          </span>
          <span className='inline-block'>S</span>
          <span className='inline-block max-w-0 overflow-hidden opacity-0 group-hover:max-w-[1em] group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] delay-200'>
            u
          </span>
          <span className='inline-block max-w-0 overflow-hidden opacity-0 group-hover:max-w-[1em] group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] delay-250'>
            m
          </span>
        </Link>
        <button className='p-2 hover:bg-white/10 rounded-full transition-colors'>
          <div className='flex items-center gap-1'>
            <IoBagOutline className='w-5 h-5' />
            <p className='text-lg'>(0)</p>
          </div>
        </button>
      </div>
    </nav>
  );
}
