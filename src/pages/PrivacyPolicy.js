import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="utility-page">
      <motion.div
        className="utility-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-gray-300">
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Information Collection</h2>
            <p>The CS Club IIITDMK collects minimal personal information necessary to facilitate club operations, communication, and professional development activities.</p>
          </section>
          
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Data Usage</h2>
            <p>Personal information is exclusively used for club-related communications, event coordination, and professional networking purposes. We are committed to maintaining the highest standards of data confidentiality.</p>
          </section>
          
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Information Protection</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Strict confidentiality of member information</li>
              <li>No unauthorized sharing of personal data</li>
              <li>Limited use of contact information for official communications</li>
              <li>Adherence to institutional data protection guidelines</li>
            </ul>
          </section>
          
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">User Consent</h2>
            <p>By participating in CS Club activities, members consent to the collection and use of information as outlined in this policy. Members retain the right to request information about their stored data.</p>
          </section>
          
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p>For privacy-related inquiries or concerns, please contact: csclub@iiitdm.ac.in</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;