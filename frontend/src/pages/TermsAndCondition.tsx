import React from "react";

const TermsAndCondition = () => {
  return (
    <main className="px-4 py-10 sm:px-8 md:px-16 bg-gray-50 min-h-screen">
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Terms & Conditions
        </h2>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              1. Acceptance of Terms
            </h3>
            <p>
              By using <strong>gharCIHE</strong>, you agree to these Terms and Conditions. If you don't agree, please don't use our service.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              2. User Responsibilities
            </h3>
            <p>
              You must provide accurate information and use the platform responsibly. Any false information may result in account termination.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              3. Accommodation Listings
            </h3>
            <p>
              All listings must be accurate. We verify listings but cannot guarantee all information. Always verify details before committing.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              4. Privacy Policy
            </h3>
            <p>
              We protect your personal information according to our Privacy Policy. By using our service, you consent to our data practices.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              5. Changes to Terms
            </h3>
            <p>
              We may update these terms. Continued use after changes means you accept the new terms.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsAndCondition;
