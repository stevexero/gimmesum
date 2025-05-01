import { IoSend } from 'react-icons/io5';

export default function SubscribeForm() {
  return (
    <form className='flex flex-row items-center justify-center'>
      <h2 className='text-red-800 border-b border-red-800'>
        stay updated:&nbsp;
      </h2>
      <input
        type='email'
        placeholder='email'
        className='min-w-[240px] text-right bg-transparent border-b border-red-800 focus:outline-none focus:ring-0 focus:border-red-500 text-red-500 placeholder:text-red-800 placeholder:text-opacity-50'
      />
      <button
        type='submit'
        className='ml-4 text-red-800 hover:text-red-500 transition-colors'
      >
        <IoSend />
      </button>
    </form>
  );
}
