import React from 'react';
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';

function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        {/* Content Section */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-2">What do we do with your information?</h2>
            <p className="text-gray-700 leading-relaxed">
              When you purchase something from our shop, as part of the buying and selling process, 
              we collect the personal information you give us such as your name, address, and email address.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              When you browse our store, we also automatically receive your computer’s internet protocol (IP) address to provide us 
              with information that helps us learn about your browser and operating system.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Consent</h2>
            <h3 className="text-xl font-semibold mb-1">How do you get my consent?</h3>
            <p className="text-gray-700 leading-relaxed">
              When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange 
              for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your express consent 
              or provide you with an opportunity to say no.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-1">How do I withdraw my consent?</h3>
            <p className="text-gray-700 leading-relaxed">
              If, after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, 
              use, or disclosure of your information, at any time by contacting us at 
              <a href="mailto:shop@aucklandartgallery.com" className="text-blue-500 hover:underline"> awarna@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Disclosure</h2>
            <p className="text-gray-700 leading-relaxed">
              We may disclose your personal information if we are required or permitted by law to do so.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Correction of Information</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to request a copy of all of your personal information that we hold and, 
              if any of it is incorrect, to request that it is corrected by contacting us at 
              <a href="mailto:shop@aucklandartgallery.com" className="text-blue-500 hover:underline"> awarna@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Payment</h2>
            <p className="text-gray-700 leading-relaxed">
              If you choose a direct payment gateway to complete your purchase, then Shopify stores your credit card data. It is encrypted 
              in compliance with the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction data is stored only 
              as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information 
              is deleted.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              All direct payment gateways adhere to PCI-DSS standards as managed by the PCI Security Standards Council, which includes 
              brands like Visa, MasterCard, American Express, and Discover.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Any information collected by Paypal is collected for processing your order and will not be disclosed to a third party. 
              We have no access to any credit card numbers or bank details at any point.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Third-party Services</h2>
            <p className="text-gray-700 leading-relaxed">
              In general, third-party providers used by us will only collect, use, and disclose your information to the extent necessary 
              to allow them to perform the services they provide to us.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              We recommend reading their privacy policies to understand how your personal information is handled by them. 
              Keep in mind that certain providers may be located in jurisdictions different from either you or us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Links</h2>
            <p className="text-gray-700 leading-relaxed">
              When you click on links on our store, they may direct you away from our website. We are not responsible for the privacy 
              practices of other sites and encourage you to read their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Security</h2>
            <p className="text-gray-700 leading-relaxed">
              To protect your personal information, we take reasonable precautions to ensure it is not inappropriately lost, misused, 
              accessed, disclosed, altered, or destroyed. Credit card information is encrypted using SSL and stored with AES-256 encryption.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Changes to this Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify this privacy policy at any time. Changes will take effect immediately upon posting on the website. 
              If we make material changes, we will notify you here.
            </p>
          </section>
        </div>
      </div>

      <FooterComp />
    </div>
  );
}

export default PrivacyPolicy;
