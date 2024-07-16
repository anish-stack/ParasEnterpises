import React from 'react';

const ShippingPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
      <p className="mb-4">
        We offer shipping services for all orders placed on the Paras Enterprises website. Please review the following
        information to understand our shipping policies and procedures.
      </p>
      <h2 className="text-xl font-bold mb-2">Shipping Methods</h2>
      <p className="mb-4">
        We offer standard shipping via reputable carriers such as FedEx, UPS, and USPS. Expedited shipping options may
        be available for an additional fee.
      </p>
      <h2 className="text-xl font-bold mb-2">Shipping Times</h2>
      <p className="mb-4">
        Orders are typically processed and shipped within 1-2 business days. Shipping times vary depending on the
        destination and selected shipping method.
      </p>
      <h2 className="text-xl font-bold mb-2">Shipping Rates</h2>
      <p className="mb-4">
        Shipping rates are calculated based on the weight and dimensions of the package, as well as the destination
        address. Shipping costs will be displayed at checkout.
      </p>
      {/* Add more shipping policy content here */}
    </div>
  );
};

export default ShippingPolicyPage;
