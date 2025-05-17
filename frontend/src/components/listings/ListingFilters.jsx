import React from 'react';

const ListingFilters = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by city"
        value={filters?.city || ''}
        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        className="input"
      />

      <select
        value={filters?.type || ''}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="input"
      >
        <option value="">All Types</option>
        <option value="Private Room">Private Room</option>
        <option value="Shared Room">Shared Room</option>
        <option value="Studio">Studio</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
      </select>

      <input
        type="number"
        placeholder="Max Price"
        value={filters?.price || ''}
        onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        className="input"
      />
    </div>
  );
};

export default ListingFilters;
