import React from 'react';

const ListingFilters = ({ filters, setFilters }) => {
  // Handle reset filters
  const handleResetFilters = () => {
    setFilters({
      city: "",
      type: ""
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by city, address or title"
            value={filters?.city || ''}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
          />
        </div>
        
        <div className="w-full md:w-64">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            id="type"
            value={filters?.type || ''}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
          >
            <option value="">All Types</option>
            <option value="Private Room">Private Room</option>
            <option value="Shared Room">Shared Room</option>
            <option value="Studio">Studio</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
          </select>
        </div>
        
        <div className="self-end mt-4 md:mt-0">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;