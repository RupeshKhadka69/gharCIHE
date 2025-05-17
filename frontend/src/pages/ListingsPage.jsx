import React from "react";
import { useListings } from "../hooks/useListings";
import ListingGrid from "../components/listings/ListingGrid";
import ListingFilters from "../components/listings/ListingFilters";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ListingsPage = () => {
  const { listings, isListingsLoading, listingsError } = useListings();

  if (isListingsLoading) return <LoadingSpinner />;
  if (listingsError) return <div>Error loading listings.</div>;

  return (
    <div className="p-6">
      <ListingFilters />
      <ListingGrid listings={listings} />
    </div>
  );
};

export default ListingsPage;
