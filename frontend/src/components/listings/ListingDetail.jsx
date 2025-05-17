import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

const ListingDetail = ({ listing, error }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-red-100 text-red-800 p-4 rounded-md text-center">
          Error loading listing: {error?.message}
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-red-100 text-red-800 p-4 rounded-md text-center">
          Listing not found
        </div>
      </div>
    );
  }

  // Format price to include thousand separators
  const formattedPrice = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(listing.price);

  // Handle contact owner
  const handleContact = () => {
    // if (!isAuthenticated) {
    //   toast.error("Please log in to contact the owner");
    //   navigate("/login", { state: { from: `/listings/${id}` } });
    //   return;
    // }

    // Open dialog or modal for contact form
    toast.success(`Contact number: ${listing.contactNumber}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Listing Status Banner */}
      <div
        className={`mb-4 py-2 px-4 rounded-md text-white ${
          listing.status === "available" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        This property is currently {listing.status}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-200 rounded-lg overflow-hidden mb-4 h-80">
            <img
              src={`${import.meta.env.VITE_API_URL}${
                listing.images[activeImage]
              }`}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {listing.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border-2 ${
                    activeImage === index
                      ? "border-red-600"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}${image}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Listing Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {listing.title}
          </h1>
          <p className="text-xl font-semibold text-red-600 mb-4">
            {formattedPrice} per week
          </p>

          <div className="text-gray-700 mb-6">
            <p className="mb-2">
              <strong>Address:</strong> {listing.address}, {listing.city}
            </p>
            <p className="mb-2">
              <strong>Type:</strong> {listing.type}
            </p>
            <p className="mb-2">
              <strong>Bedrooms:</strong> {listing.bedrooms}
            </p>
            <p className="mb-2">
              <strong>Bathrooms:</strong> {listing.bathrooms}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {listing.amenities.fullyFurnished && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Fully Furnished</span>
                </div>
              )}
              {listing.amenities.wifiIncluded && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>WiFi Included</span>
                </div>
              )}
              {listing.amenities.laundry && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Laundry</span>
                </div>
              )}
              {listing.amenities.sharedKitchen && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Shared Kitchen</span>
                </div>
              )}
              {listing.amenities.security && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Security</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Button */}
          <button
            // onClick={handleContact}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md"
          >
            Contact Owner- {listing.contactNumber}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
