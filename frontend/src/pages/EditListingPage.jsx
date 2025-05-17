// EditListingPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import ListingForm from "../components/forms/ListingForm";
import LoadingSpinner from "../components/common/LoadingSpinner";

const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateListing } = useListings();
  const { useFetchListing } = useListings();
  const { data, isLoading } = useFetchListing(id);
  const handleUpdateListing = (formData) => {
    updateListing.mutate(
      { id, formData },
      {
        onSuccess: (res) => {
          console.log("Listing updated:", res.data);
          navigate("/owner/listings"); // redirect after success
        },
        onError: (err) => {
          console.error(
            "Failed to update listing:",
            err.response?.data || err.message
          );
          alert("Something went wrong while updating the listing.");
        },
      }
    );
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <ListingForm
        data={data?.data}
        isEdit={true}
        onSubmit={handleUpdateListing}
      />
    </div>
  );
};

export default EditListingPage;
