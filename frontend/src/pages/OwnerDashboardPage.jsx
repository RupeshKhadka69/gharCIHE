import React from "react";
import { useListings } from "../hooks/useListings";
import ListingCard from "../components/listings/ListingCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Link } from "react-router-dom";

const OwnerDashboardPage = () => {
  const { ownerListings, isOwnerLoading } = useListings();
  console.log("ownerListings", ownerListings);

  if (isOwnerLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">My Listings</h2>
        <Link to="/add-listing" className="text-blue-600">
          Add New
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ownerListings?.data?.map((listing) => (
          <ListingCard key={listing._id} listing={listing} isOwnerView={true} />
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
