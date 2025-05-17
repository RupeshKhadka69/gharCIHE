import React from 'react';
import { useListings } from '../hooks/useListings';
import { useNavigate } from 'react-router-dom'; // or useRouter() if using Next.js
import ListingForm from '../components/forms/ListingForm';

const CreateListingPage = () => {
  const { createListing } = useListings();
  const navigate = useNavigate();

  const handleCreateListing = (formData) => {
    createListing.mutate(formData, {
      onSuccess: (res) => {
        console.log("Listing created:", res.data);
        navigate('/listings'); 
      },
      onError: (err) => {
        console.error("Failed to create listing:", err.response?.data || err.message);
        alert("Something went wrong while creating the listing.");
      },
    });
  };

  return (
    <div className="p-6">
      <ListingForm onSubmit={handleCreateListing} />
    </div>
  );
};

export default CreateListingPage;
