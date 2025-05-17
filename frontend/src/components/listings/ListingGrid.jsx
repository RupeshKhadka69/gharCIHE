import React from 'react';
import ListingCard from './ListingCard';

const ListingGrid = ({ listings }) => {
  // Safety check for listings structure
  if (!listings || !listings.data || listings.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No listings match your search criteria.</p>
        <p className="text-gray-400 mt-2">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.data.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingGrid;