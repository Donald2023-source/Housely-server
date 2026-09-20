import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  name: string;
  description: string;

  images: string[];

  propertyType:
    | "apartment"
    | "duplex"
    | "bungalow"
    | "terrace"
    | "detached"
    | "semi-detached"
    | "land"
    | "office";

  listingType: "sale" | "rent" | "shortlet";

  price: number;
  currency: "NGN" | "USD";

  bedrooms: number;
  bathrooms: number;
  toilets: number;

  area: number;
  yearBuilt?: number;

  furnished: boolean;

  features: string[];

  location: {
    address: string;
    area: string;
    city: string;
    state: string;
    country: string;

    coordinates: {
      latitude: number;
      longitude: number;
    };
  };

  agent: mongoose.Types.ObjectId;

  rating: number;
  reviewsCount: number;

  verified: boolean;
  featured: boolean;

  views: number;
  favorites: number;
}

const propertySchema = new Schema<IProperty>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      required: true,
    },

    propertyType: {
      type: String,
      enum: [
        "apartment",
        "duplex",
        "bungalow",
        "terrace",
        "detached",
        "semi-detached",
        "land",
        "office",
      ],
      required: true,
    },

    listingType: {
      type: String,
      enum: ["sale", "rent", "shortlet"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      enum: ["NGN", "USD"],
      default: "NGN",
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    toilets: {
      type: Number,
      required: true,
      min: 0,
    },

    area: {
      type: Number,
      required: true,
      min: 0,
    },

    yearBuilt: {
      type: Number,
    },

    furnished: {
      type: Boolean,
      default: false,
    },

    features: {
      type: [String],
      default: [],
    },

    location: {
      address: {
        type: String,
        required: true,
      },

      area: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        default: "Nigeria",
      },

      coordinates: {
        latitude: {
          type: Number,
        },

        longitude: {
          type: Number,
        },
      },
    },

    agent: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    favorites: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Property = mongoose.model<IProperty>("Property", propertySchema);

export default Property;
