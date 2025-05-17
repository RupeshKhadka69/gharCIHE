// routes/listingRoutes.js
const express = require("express");
const router = express.Router();
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getOwnerListings,
} = require("../controllers/listingController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router
  .route("/")
  .get(getListings)
  .post(
    protect,
    authorize("owner", "admin"),
    upload.array("images", 5),
    createListing
  );

router
  .route("/owner")
  .get(protect, authorize("owner", "admin"), getOwnerListings);

router
  .route("/:id")
  .get(getListing)
  .put(
    protect,
    authorize("owner", "admin"),
    upload.array("images", 5),
    updateListing
  )
  .delete(protect, authorize("owner", "admin"), deleteListing);

module.exports = router;
