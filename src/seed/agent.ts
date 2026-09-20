import mongoose from "mongoose";
import Agent from "../models/agent.ts";
import config from "../../config/constants.ts";

const agent = [
  {
    name: "David Williams",
    email: "david@hously.com",
    phone: "+2348012345678",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    bio: "Professional real estate agent helping clients find premium properties across Nigeria.",
    agency: "Hously Realty",
    licenseNumber: "LAG-RE-20482",

    location: {
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },

    specialties: ["Luxury Homes", "Apartments", "Residential Properties"],

    yearsOfExperience: 7,
    verified: true,
    rating: 4.8,
    reviewsCount: 42,
    propertiesCount: 24,
  },
  {
    name: "Sarah Williams",
    email: "sara@hously.com",
    phone: "+2348012345678",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    bio: "Professional real estate agent helping clients find premium properties across Nigeria.",
    agency: "Hously Realty",
    licenseNumber: "LAG-RE-20482",

    location: {
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },

    specialties: ["Luxury Homes", "Apartments", "Residential Properties"],

    yearsOfExperience: 7,
    verified: true,
    rating: 4.8,
    reviewsCount: 42,
    propertiesCount: 24,
  },
];

const seedAgent = async () => {
  try {
    await mongoose.connect(config.mongo_uri);

    console.log("MongoDB connected");

    await Agent.deleteMany({});

    await Agent.create(agent);

    console.log("Agent seeded successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding agent:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAgent();
