import TermsOfServiceLayout from './layout';

export default function page() {
  return (
    <TermsOfServiceLayout>
      <div className='text-center max-w-[600px] mx-auto'>
        <h1 className='text-4xl font-bold'>Terms of Service</h1>
        <p className='mt-8 text-lg'>
          This Terms of Service outlines the rules and regulations for using our
          website.
        </p>
      </div>
    </TermsOfServiceLayout>
  );
}
