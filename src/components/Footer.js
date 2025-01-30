import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';

const Footer = () => {
  return (
    <footer className="bg-black/90 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="flex space-x-6 mb-6">
            <a
              href="https://github.com/CSClubIIITDM-org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-gray-400 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/cs.club.iiitdm/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-gray-400 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/cs-club-iiitdm-kancheepuram/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-gray-400 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:csclub@iiitdm.ac.in"
              className="text-3xl hover:text-gray-400 transition-colors"
            >
              <FaEnvelope />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <Link to="/location" className="hover:text-gray-400 transition-colors">Location</Link>
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CS Club IIITDM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;