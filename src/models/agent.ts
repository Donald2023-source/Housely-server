import mongoose, { Document, Schema } from "mongoose";

export interface IAgent extends Document {
  name: string;
  email: string;
  phone: string;
  avatar?: string;

  bio?: string;

  agency?: string;

  licenseNumber?: string;

  location?: {
    city: string;
    state: string;
    country: string;
  };

  specialties: string[];

  yearsOfExperience: number;

  verified: boolean;

  rating: number;
  reviewsCount: number;

  propertiesCount: number;

  createdAt: Date;
  updatedAt: Date;
}

const agentSchema = new Schema<IAgent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    agency: {
      type: String,
      trim: true,
    },

    licenseNumber: {
      type: String,
      trim: true,
    },

    location: {
      city: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      country: {
        type: String,
        default: "Nigeria",
        trim: true,
      },
    },

    specialties: {
      type: [String],
      default: [],
    },

    yearsOfExperience: {
      type: Number,
      default: 0,
      min: 0,
    },

    verified: {
      type: Boolean,
      default: false,
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

    propertiesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  {
    timestamps: true,
  }
);

const Agent = mongoose.model<IAgent>("Agent", agentSchema);

export default Agent;