import React from 'react';
import ListingCard from './ListingCard';

const ListingGrid = ({ listings }) => {
    console.log('ListingGrid', listings);
  if (!listings || listings.data.length === 0) {
    return <p className="text-center text-gray-500">No listings found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {listings?.data?.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingGrid;
