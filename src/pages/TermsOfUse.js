import React from 'react';
import { motion } from 'framer-motion';

const TermsOfUse = () => {
  return (
    <div className="utility-page">
      <motion.div
        className="utility-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        <div className="space-y-6 text-gray-300">
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Membership Guidelines</h2>
            <p>Participation in the CS Club IIITDMK constitutes agreement to maintain a professional, respectful, and inclusive environment that promotes collaborative learning and personal growth.</p>
          </section>
          
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Code of Conduct</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Maintain professional and ethical standards</li>
              <li>Respect intellectual diversity and individual perspectives</li>
              <li>Uphold academic integrity in all club activities</li>
              <li>Engage in constructive and professional communication</li>
              <li>Collaborate with mutual respect and support</li>
            </ul>
          </section>
          
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Prohibited Conduct</h2>
            <p>The following behaviors are strictly prohibited and may result in disciplinary action:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>Harassment or discriminatory language</li>
              <li>Inappropriate or offensive communication</li>
              <li>Disruption of club activities</li>
              <li>Violation of academic integrity principles</li>
              <li>Unauthorized use of club resources</li>
            </ul>
          </section>
          
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Disciplinary Measures</h2>
            <p>Violations of these terms may result in:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>Formal warning</li>
              <li>Temporary suspension from club activities</li>
              <li>Permanent membership termination</li>
              <li>Potential referral to institutional authorities</li>
            </ul>
          </section>
          
          <section className="enhanced-card">
            <h2 className="text-2xl font-bold mb-4">Reporting Mechanism</h2>
            <p>Members are encouraged to report any conduct violations through official channels. All reports will be handled confidentially and investigated thoroughly.</p>
            <p className="mt-2 font-semibold">Contact: csclub@iiitdm.ac.in</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfUse;