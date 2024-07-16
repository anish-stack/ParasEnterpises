import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">
        By accessing or using the Paras Enterprises website, you agree to be bound by these Terms and Conditions. Please
        read them carefully before using our website or services.
      </p>
      <h2 className="text-xl font-bold mb-2">Intellectual Property</h2>
      <p className="mb-4">
        All content included on this website, such as text, graphics, logos, images, audio clips, digital downloads, and
        data compilations, is the property of Paras Enterprises and protected by copyright laws.
      </p>
      <h2 className="text-xl font-bold mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        Paras Enterprises shall not be liable for any direct, indirect, incidental, special, or consequential damages
        arising out of the use of or inability to use our website or services.
      </p>
      {/* Add more terms and conditions content here */}
    </div>
  );
};

export default TermsAndConditionsPage;
