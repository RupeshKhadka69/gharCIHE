import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ListingForm = ({
  data,
  isEdit = false,
  onSubmit,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const [existingImages, setExistingImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    if (data) {
      reset({ ...data });
      if (data.images && Array.isArray(data.images)) {
        setExistingImages(data.images);
      }
    }
  }, [data, reset]);

  const images = watch("images");

  const handleFormSubmit = (data) => {
    const formData = new FormData();

    for (let key of [
      "title",
      "description",
      "price",
      "address",
      "city",
      "contactNumber",
      "bedrooms",
      "bathrooms",
      "status",
      "type",
    ]) {
      if (data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }

    formData.append("fullyFurnished", data.amenities?.fullyFurnished || false);
    formData.append("wifiIncluded", data.amenities?.wifiIncluded || false);
    formData.append("laundry", data.amenities?.laundry || false);
    formData.append("sharedKitchen", data.amenities?.sharedKitchen || false);
    formData.append("security", data.amenities?.security || false);

    if (images && images.length > 0) {
      Array.from(images).forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    }

    deletedImages.forEach((url) => {
      formData.append("deletedImages", url);
    });

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        {isEdit ? "Edit Listing" : "Create New Listing"}
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title cannot exceed 100 characters",
              },
            })}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Price (Weekly)</label>
          <input
            type="number"
            {...register("price", {
              required: "Weekly price is required",
              min: {
                value: 0,
                message: "Price must be a positive number",
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="Price"
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block font-medium">Status</label>
          <select
            {...register("status")}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Bedrooms</label>
          <input
            type="number"
            {...register("bedrooms", {
              required: "Number of bedrooms is required",
              min: {
                value: 1,
                message: "At least 1 bedroom required",
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="Bedrooms"
          />
          {errors.bedrooms && (
            <p className="text-sm text-red-500">{errors.bedrooms.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Bathrooms</label>
          <input
            type="number"
            {...register("bathrooms", {
              required: "Number of bathrooms is required",
              min: {
                value: 1,
                message: "At least 1 bathroom required",
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="Bathrooms"
          />
          {errors.bathrooms && (
            <p className="text-sm text-red-500">{errors.bathrooms.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">City</label>
          <input
            {...register("city", {
              required: "City is required",
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="City"
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            {...register("address", {
              required: "Address is required",
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium">Contact Number</label>
          <input
            {...register("contactNumber", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Contact number must be 10 digits",
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="Contact Number"
          />
          {errors.contactNumber && (
            <p className="text-sm text-red-500">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium">Type</label>
          <select
            {...register("type")}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          >
            <option value="Private Room">Private Room</option>
            <option value="Shared Room">Shared Room</option>
            <option value="Studio">Studio</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            rows={4}
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-sm text-red-500">Description is required</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("amenities.fullyFurnished")} />
            Furnished
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("amenities.wifiIncluded")} />
            Wi-Fi
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("amenities.laundry")} />
            Laundry
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("amenities.sharedKitchen")} />
            Kitchen
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("amenities.security")} />
            Security
          </label>
        </div>
      </div>

      <div>
        <label className="block font-medium">Upload Images</label>
        <input
          type="file"
          className="w-full p-2 border rounded focus:outline-none focus:ring"
          multiple
          {...register("images", {
            validate: (value) =>
              (isEdit &&
                existingImages.length + value.length - deletedImages.length >
                  0) ||
              (!isEdit && value.length > 0) ||
              "Please upload at least one image",
          })}
        />
        {errors.images && (
          <p className="text-sm text-red-500">{errors.images.message}</p>
        )}
      </div>

      {/* New Image Previews */}
      {images && !isEdit && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
          {Array.from(images).map((img, index) => {
            const isFile = img instanceof File;
            const src = isFile
              ? URL.createObjectURL(img)
              : `${import.meta.env.VITE_API_URL}${img}`;

            return (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="h-24 w-full object-cover rounded shadow"
              />
            );
          })}
        </div>
      )}

      {/* Existing Image Previews for Edit */}
      {isEdit && existingImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
          {existingImages.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={`${import.meta.env.VITE_API_URL}${url}`}
                alt={`existing-${index}`}
                className="h-24 w-full object-cover rounded shadow"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white px-1.5 py-0.5 text-xs rounded hover:bg-opacity-80"
                onClick={() => {
                  setDeletedImages((prev) => [...prev, url]);
                  setExistingImages((prev) =>
                    prev.filter((img) => img !== url)
                  );
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
      >
        {isEdit ? "Update Listing" : "Submit Listing"}
      </button>
    </form>
  );
};

export default ListingForm;
