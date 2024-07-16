import React from 'react';

const RefundPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
      <p className="mb-4">
        We want you to be completely satisfied with your purchase. If you are not satisfied for any reason, you may
        return the item(s) within 30 days of purchase for a full refund.
      </p>
      <h2 className="text-xl font-bold mb-2">Conditions for Refund</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Item(s) must be returned in their original condition.</li>
        <li>Item(s) must be unused and in the original packaging.</li>
        <li>Return shipping costs are the responsibility of the customer.</li>
      </ul>
      <p className="mb-4">
        Once your return is received and inspected, we will process your refund within 7-10 business days. Refunds will
        be issued to the original method of payment.
      </p>
      {/* Add more refund policy content here */}
    </div>
  );
};

export default RefundPolicyPage;
