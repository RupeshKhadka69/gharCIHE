// models/Listing.js
const mongoose = require('mongoose');
const slugify = require('slugify');


const ListingSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a weekly price']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  city: {
    type: String,
    required: [true, 'Please add a city']
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  },
  amenities: {
    fullyFurnished: {
      type: Boolean,
      default: false
    },
    wifiIncluded: {
      type: Boolean,
      default: false
    },
    laundry: {
      type: Boolean,
      default: false
    },
    sharedKitchen: {
      type: Boolean,
      default: false
    },
    security: {
      type: Boolean,
      default: false
    }
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please specify number of bedrooms']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please specify number of bathrooms']
  },
  type: {
    type: String,
    enum: ['Private Room', 'Shared Room', 'Studio', 'Apartment', 'House'],
    required: [true, 'Please specify accommodation type']
  },
  images: {
    type: [String],
    required: [true, 'Please upload at least one image']
  },
  contactNumber: {
    type: String,
    required: [true, 'Please provide a contact number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create listing slug from the title
ListingSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Listing', ListingSchema);