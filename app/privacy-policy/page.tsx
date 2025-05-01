import React from 'react';
import PrivacyPolicyLayout from './layout';
export default function page() {
  return (
    <PrivacyPolicyLayout>
      <div className='text-center max-w-[600px] mx-auto'>
        <h1 className='text-4xl font-bold'>Privacy Policy</h1>
        <p className='mt-8 text-lg'>
          This Privacy Policy outlines how we collect, use, and protect your
          personal information when you visit our website.
        </p>
      </div>
    </PrivacyPolicyLayout>
  );
}
