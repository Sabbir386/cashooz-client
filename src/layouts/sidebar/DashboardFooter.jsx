import React from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

const DashboardFooter = () => {
  return (
    <footer className="bg-secondaryColor text-white py-10 px-6 md:px-10 lg:px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Logo Section */}
          <div>
          <span className="text-buttonBackground font-bold text-2xl">CASHOOZ</span>
          <p className='text-xs text-gray-400'>© 2022 - 2024 Cashooz. All rights reserved.</p>
          </div>
          {/* Info Section */}
          <div>
            <h2 className="text-sm font-semibold mb-4">INFO</h2>
            <ul className="space-y-2 text-sm">
              <li>Formats</li>
              <li>Compression</li>
              <li>Pricing</li>
              <li>FAQ</li>
              <li>Status</li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h2 className="text-sm font-semibold mb-4">RESOURCES</h2>
            <ul className="space-y-2 text-sm">
              <li>Developer API</li>
              <li>Tools</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h2 className="text-sm font-semibold mb-4">COMPANY</h2>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Sustainability</li>
              <li>Terms of Service</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <FaFacebook />

            </a>
            <a href="#" className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
            <FaTwitterSquare />

            </a>
            <a href="#" className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center">
            <FaInstagramSquare />

            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
