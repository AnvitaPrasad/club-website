

import React from 'react';
import { motion } from 'framer-motion';

const Location = () => {
  return (
    <div className="utility-page">
      <motion.div
        className="utility-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Our Location</h1>
        <div className="enhanced-card mb-8">
          <h2 className="text-2xl font-bold mb-4">IIITDM Campus</h2>
          <p className="text-gray-300 mb-4">
            Indian Institute of Information Technology,
            Design and Manufacturing, Kancheepuram
          </p>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.040685843183!2d80.13646731482037!3d12.837631990945775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525851fbcd3b6b%3A0x9f1067aa71e3898e!2sIndian%20Institute%20of%20Information%20Technology%2C%20Design%20and%20Manufacturing%2C%20Kancheepuram!5e0!3m2!1sen!2sin!4v1625641030663!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IIITDM Kancheepuram Location"
              className="rounded-lg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Location;