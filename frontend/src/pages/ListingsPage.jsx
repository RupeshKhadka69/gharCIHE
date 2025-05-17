import React, { useState, useEffect } from "react";
import { useListings } from "../hooks/useListings";
import ListingGrid from "../components/listings/ListingGrid";
import ListingFilters from "../components/listings/ListingFilters";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ListingsPage = () => {
  const { listings, isListingsLoading, listingsError } = useListings();
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    type: ""
  });

  // Apply filters whenever listings or filters change
  useEffect(() => {
    if (!listings?.data) return;
    
    let results = [...listings.data];
    
    // Apply city filter (case-insensitive search)
    if (filters.city) {
      results = results.filter(listing => 
        listing.city.toLowerCase().includes(filters.city.toLowerCase()) ||
        listing.address.toLowerCase().includes(filters.city.toLowerCase()) ||
        listing.title.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filters.type) {
      results = results.filter(listing => listing.type === filters.type);
    }
    
    setFilteredListings({ data: results });
  }, [listings, filters]);

  if (isListingsLoading) return <LoadingSpinner />;
  if (listingsError) return <div>Error loading listings.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Listings</h1>
      <ListingFilters filters={filters} setFilters={setFilters} />
      <ListingGrid listings={filteredListings.length === 0 ? listings : filteredListings} />
    </div>
  );
};

export default ListingsPage;