import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useListings } from "../../hooks/useListings";
import toast from "react-hot-toast";

const ListingCard = ({ listing, isOwnerView = false }) => {
  const { user } = useAuthStore();
  const { deleteListing } = useListings();
  const navigate = useNavigate();

  const isOwner = isOwnerView
    ? user?.id === listing?.owner
    : user?.id === listing?.owner?._id;

  const formattedPrice = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(listing.price);

  const handleDeleteListing = (id) => {
    deleteListing.mutate(
      { id },
      {
        onSuccess: (res) => {
          toast.success("Listing deleted successfully");
          navigate("/listings");
        },
        onError: (err) => {
          console.error("Failed to delete listing:", err);
          alert("Something went wrong while deleting the listing.");
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 w-full max-w-md mx-auto md:max-w-full">
      {/* Image */}
      <div className=" relative">
        <img
          src={`${import.meta.env.VITE_API_URL}${listing.images[0]}`}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
          {listing.status === "available" ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between ">
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {listing.title}
            </h3>
            <span className="text-red-600 font-bold text-sm sm:text-base">
              {formattedPrice}/week
            </span>
          </div>

          <p className="text-gray-500 text-sm mb-3 line-clamp-1">
            {listing.address}, {listing.city}
          </p>

          <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-4">
            <span className="flex items-center gap-1">🏠 {listing.type}</span>
            <span className="flex items-center gap-1">
              🛏 {listing.bedrooms} {listing.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
            <span className="flex items-center gap-1">
              🛁 {listing.bathrooms}{" "}
              {listing.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {listing.amenities.fullyFurnished && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                🪑 Furnished
              </span>
            )}
            {listing.amenities.wifiIncluded && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                📶 WiFi
              </span>
            )}
            {listing.amenities.laundry && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                🧺 Laundry
              </span>
            )}
            {listing.amenities.sharedKitchen && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                🍳 Kitchen
              </span>
            )}
            {listing.amenities.security && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                🔒 Security
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  sm:justify-between sm:items-center gap-2 mt-auto">
          <Link
            to={`/listings/${listing._id}`}
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded text-center text-sm"
          >
            View Details
          </Link>

          {(isOwner || user?.role === "admin") && (
            <div className="flex gap-2">
              <Link
                to={`/edit-listing/${listing._id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this listing?"
                  );
                  if (confirmDelete) {
                    handleDeleteListing(listing._id);
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
