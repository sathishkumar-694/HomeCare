import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-left items-end">
        {/* Contact Info */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <p>Email: support@homecare.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Chennai, India</p>
        </div>

        {/* Copyright */}
        <div className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} HomeCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
