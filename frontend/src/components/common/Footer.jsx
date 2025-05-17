// footer
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white mt-auto border-t border-red-600">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold">
              <span className="text-white">ghar</span>
              <span className="text-red-600">CIHE</span>
            </Link>
            <p className="text-sm mt-2">Safe, affordable housing for students</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link>
                </li>
                <li>
                  <Link to="/listings" className="text-gray-300 hover:text-white text-sm">Listings</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white text-sm">About</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <ul className="space-y-1">
                <li className="text-gray-300 text-sm">Email: contact@gharcihe.com</li>
                <li className="text-gray-300 text-sm">Phone: +61 2 1234 5678</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} gharCIHE. All rights reserved.</p>
          {/* terms and condition */}
            <Link to="/terms" className="text-gray-300 hover:text-white">Terms and Condition</Link> 
        </div>
      </div>
    </footer>
  );
};

export default Footer;