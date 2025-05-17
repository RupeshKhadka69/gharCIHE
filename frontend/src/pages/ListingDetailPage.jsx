import React from 'react';
import { useParams } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import ListingDetail from '../components/listings/ListingDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ListingDetailPage = () => {
  const { id } = useParams();
  const { useFetchListing } = useListings();
  const { data, isLoading,error } = useFetchListing(id);
  console.log("ListingDetailPage data", data?.data);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <ListingDetail listing={data?.data} error={error}/>
    </div>
  );
};

export default ListingDetailPage;
