
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Barter Haven</h3>
            <p className="mb-4 text-gray-400">
              A modern platform for trading goods without money. Exchange what you have for what you need.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/items" className="text-gray-400 hover:text-teal-400 transition-colors">Browse Items</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-teal-400 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-teal-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-teal-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-teal-400 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-teal-400 transition-colors">Register</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-teal-400 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-teal-400 transition-colors">Profile</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-teal-400 transition-colors">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Barter Street</p>
              <p>Exchange City, EC 12345</p>
              <p>Email: info@barterhaven.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Barter Haven Exchange. All rights reserved.
          </p>
          <p className="mt-2 text-sm flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-1" /> for a sustainable future
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
