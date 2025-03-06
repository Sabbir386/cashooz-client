import React from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaPinterestSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardFooter = () => {
  return (
    <footer className="bg-secondaryColor text-white py-10 px-6 md:px-10 lg:px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-6 justify-between items-center">
          {/* Logo Section */}
          <div>
            <span className="text-buttonBackground font-bold text-2xl">
              CASHOOZ
            </span>
            <p className="text-xs text-gray-400">
              © 2022 - 2025 Cashooz. All rights reserved.
            </p>
          </div>
          {/* Info Section */}
          {/* <div>
            <h2 className="text-sm font-semibold mb-4">INFO</h2>
            <ul className="space-y-2 text-sm">
              <li>Formats</li>
              <li>Compression</li>
              <li>Pricing</li>
              <li>FAQ</li>
              <li>Status</li>
            </ul>
          </div> */}

          {/* Resources Section */}
          {/* <div>
            <h2 className="text-sm font-semibold mb-4">RESOURCES</h2>
            <ul className="space-y-2 text-sm">
              <li>Developer API</li>
              <li>Tools</li>
              <li>Blog</li>
            </ul>
          </div> */}

          {/* Company Section */}
          <div className="text-right">
            <h2 className="text-sm font-semibold mb-4">COMPANY</h2>
            <ul className="space-y-2 text-sm flex flex-col">
            <a href="mailto:support@cashooz.com?subject=Inquiry&body=Hello,%0D%0A%0D%0AI would like to know more about...">Contact Us</a>
              <Link to={"/aboutus"}>About Us</Link>
              <Link to={"/termsncondition"}>Terms of Service</Link>
              <Link to={"/privecy-policy"}>Privacy</Link>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Social Icons */}
          <div className="flex space-x-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/cashooz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
            >
              <FaFacebook />
            </a>
            {/* Twitter */}
            <a
              href="https://x.com/Cashooz_com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center"
            >
              <FaTwitterSquare />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/cashooz_com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center"
            >
              <FaInstagramSquare />
            </a>
            {/* Pinterest */}
            <a
              href="https://www.pinterest.com/cashooz_com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-red-600 rounded flex items-center justify-center"
            >
              <FaPinterestSquare />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
