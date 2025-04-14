import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="Handcrafted Haven logo" />
          <p className="mt-6 text-sm">
            At Handcrafted Haven, we celebrate the beauty of artisanal work. From carefully woven textiles to uniquely sculpted ceramics, each piece tells a story of tradition, care, and creativity. We connect you with makers who pour their heart into every creation.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <a className="hover:underline transition" href="#">Home</a>
              </li>
              <li>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <a className="hover:underline transition" href="#">About Us</a>
              </li>
              <li>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <a className="hover:underline transition" href="#">Contact</a>
              </li>
              <li>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <a className="hover:underline transition" href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in Touch</h2>
            <div className="text-sm space-y-2">
              <p>+263 787 236 452</p>
              <p>contact@handcraftedhaven.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        © 2025 Handcrafted Haven. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
