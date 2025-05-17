// controllers/listingController.js
const Listing = require("../models/Listing");
const fs = require("fs");
const path = require("path");

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private (Only owners and admins)
exports.createListing = async (req, res, next) => {
  try {
    // Check if user is owner or admin
    if (req.user.role !== "owner" && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only owners and admins can create listings",
      });
    }

    // Handle file upload
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    // Create array of image paths
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    // Create listing
    const listing = await Listing.create({
      owner: req.user.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      address: req.body.address,
      city: req.body.city,
      status: req.body.status || "available",
      amenities: {
        fullyFurnished: req.body.fullyFurnished === "true",
        wifiIncluded: req.body.wifiIncluded === "true",
        laundry: req.body.laundry === "true",
        sharedKitchen: req.body.sharedKitchen === "true",
        security: req.body.security === "true",
      },
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      type: req.body.type,
      images,
      contactNumber: req.body.contactNumber,
    });

    res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    // Clean up uploaded files if there was an error
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(
          path.join(__dirname, "..", "uploads", file.filename),
          (err) => {
            if (err) console.error("Error deleting file:", err);
          }
        );
      });
    }
    next(error);
  }
};

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
exports.getListings = async (req, res, next) => {
  try {
    // Build query
    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by city
    if (req.query.city) {
      query.city = { $regex: req.query.city, $options: "i" };
    }

    // Filter by price range
    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
    } else if (req.query.minPrice) {
      query.price = { $gte: req.query.minPrice };
    } else if (req.query.maxPrice) {
      query.price = { $lte: req.query.maxPrice };
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Listing.countDocuments(query);

    // Execute query
    const listings = await Listing.find(query)
      .populate("owner", "name email")
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: listings.length,
      pagination,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "owner",
      "name email phone"
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private (Owner of listing or admin)
exports.updateListing = async (req, res, next) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Authorization check
    if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this listing",
      });
    }

    let images = [...listing.images];

    // 1. Handle deleted images
    let deletedImages = req.body.deletedImages;

    // Normalize to array if it's a single string
    if (typeof deletedImages === "string") {
      deletedImages = [deletedImages];
    }

    if (Array.isArray(deletedImages) && deletedImages.length > 0) {
      deletedImages.forEach((imgPath) => {
        // Remove from the DB array
        images = images.filter((img) => img !== imgPath);

        // Delete the file from disk
        const fullPath = path.join(__dirname, "..", imgPath);
        fs.unlink(fullPath, (err) => {
          if (err) console.error("Failed to delete image:", fullPath, err);
        });
      });
    }

    // 2. Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => `/uploads/${file.filename}`);
      images.push(...newImages);
    }

    // 3. Construct updated data
    const updatedData = {
      title: req.body.title || listing.title,
      description: req.body.description || listing.description,
      price: req.body.price || listing.price,
      address: req.body.address || listing.address,
      city: req.body.city || listing.city,
      status: req.body.status || listing.status,
      amenities: {
        fullyFurnished:
          req.body.fullyFurnished === "true" ||
          listing.amenities.fullyFurnished,
        wifiIncluded:
          req.body.wifiIncluded === "true" || listing.amenities.wifiIncluded,
        laundry: req.body.laundry === "true" || listing.amenities.laundry,
        sharedKitchen:
          req.body.sharedKitchen === "true" || listing.amenities.sharedKitchen,
        security: req.body.security === "true" || listing.amenities.security,
      },
      bedrooms: req.body.bedrooms || listing.bedrooms,
      bathrooms: req.body.bathrooms || listing.bathrooms,
      type: req.body.type || listing.type,
      images,
      contactNumber: req.body.contactNumber || listing.contactNumber,
    };

    // 4. Update the listing
    listing = await Listing.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    // Cleanup newly uploaded files if update failed
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(
          path.join(__dirname, "..", "uploads", file.filename),
          (err) => {
            if (err) console.error("Error deleting file:", err);
          }
        );
      });
    }
    next(error);
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private (Owner of listing or admin)
exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Check if user is owner or admin
    if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this listing",
      });
    }

    // Delete images from server
    listing.images.forEach((image) => {
      const imagePath = path.join(__dirname, "..", image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    // Delete the listing from DB
    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
      message: "Listing deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get listings by owner
// @route   GET /api/listings/owner
// @access  Private (Owner or admin)
exports.getOwnerListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};
