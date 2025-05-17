// header
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          <span className="text-white">ghar</span>
          <span className="text-red-600">CIHE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 ">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/listings" className="text-white hover:text-gray-300">
            Listings
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {user?.role === "owner" && (
                <Link
                  to="/owner/listings"
                  className="text-white hover:text-gray-300"
                >
                  My Listings
                </Link>
              )}
              {user?.role === "admin" && (
                <>
                  <Link to="/add-listing" className="text-blue-600">
                    Add Listing
                  </Link>
                  <Link to="/all-user" className="text-blue-600">
                    All Users
                  </Link>
                </>
              )}

              <Link to="/profile" className="text-white hover:text-gray-300">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/listings"
              className="text-white hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Listings
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === "owner" && (
                  <Link
                    to="/owner/listings"
                    className="text-white hover:text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded inline-block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SignUp
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
