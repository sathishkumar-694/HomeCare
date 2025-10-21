import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HomeCare
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for all home service needs. Quality service, 
              reliable professionals, and customer satisfaction guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Plumbing</span></li>
              <li><span className="text-gray-300">Cleaning</span></li>
              <li><span className="text-gray-300">Salon & Beauty</span></li>
              <li><span className="text-gray-300">Home Maintenance</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400" size={18} />
                <a href="mailto:support@homecare.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                  support@homecare.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-green-400" size={18} />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-green-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-red-400" size={18} />
                <span className="text-gray-300">Chennai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} HomeCare. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="text-red-500" size={16} />
              <span>for better home services</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
