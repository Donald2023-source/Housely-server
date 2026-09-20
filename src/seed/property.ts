import mongoose from "mongoose";
import Property from "../models/property.ts";
import Agent from "../models/agent.ts";
import config from "../../config/constants.ts";

const seedProperties = async () => {
  try {
    await mongoose.connect(config.mongo_uri);

    console.log("MongoDB connected");

    const david = await Agent.findOne({ email: "david@hously.com" });

    const sarah = await Agent.findOne({
      email: "sara@hously.com",
    });
    console.log("David ID:", david?._id);
    console.log("Sarah ID:", sarah?._id);
    const properties = [
      {
        name: "Luxury 4 Bedroom Duplex",

        description:
          "A beautifully designed 4-bedroom duplex with modern finishes, spacious rooms, a fitted kitchen, and a private compound.",

        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
        ],

        propertyType: "duplex",
        listingType: "sale",

        price: 85000000,
        currency: "NGN",

        bedrooms: 4,
        bathrooms: 5,
        toilets: 5,

        area: 420,
        yearBuilt: 2024,

        furnished: false,

        features: [
          "Swimming Pool",
          "Fitted Kitchen",
          "Car Park",
          "24/7 Security",
          "Boys Quarters",
          "Garden",
          "Generator",
        ],

        location: {
          address: "12 Peace Avenue",
          area: "Lekki Phase 1",
          city: "Lagos",
          state: "Lagos",
          country: "Nigeria",

          coordinates: {
            latitude: 6.4474,
            longitude: 3.4722,
          },
        },

        agent: david?._id,

        rating: 4.8,
        reviewsCount: 32,

        verified: true,
        featured: true,

        views: 1240,
        favorites: 86,
      },

      {
        name: "Modern 3 Bedroom Apartment",

        description:
          "A spacious modern apartment located in a quiet and secure estate with excellent road access and beautiful interior finishing.",

        images: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
          "https://images.unsplash.com/photo-1615529182904-14819c35db37",
        ],

        propertyType: "apartment",
        listingType: "rent",

        price: 4500000,
        currency: "NGN",

        bedrooms: 3,
        bathrooms: 3,
        toilets: 4,

        area: 180,
        yearBuilt: 2023,

        furnished: false,

        features: [
          "Parking Space",
          "Security",
          "Fitted Kitchen",
          "Water Supply",
          "Generator",
          "Balcony",
        ],

        location: {
          address: "24 3rd Avenue",
          area: "Gwarinpa",
          city: "Abuja",
          state: "FCT",
          country: "Nigeria",

          coordinates: {
            latitude: 9.0765,
            longitude: 7.3986,
          },
        },

        agent: sarah?._id,

        rating: 4.5,
        reviewsCount: 18,

        verified: true,
        featured: true,

        views: 890,
        favorites: 45,
      },

      {
        name: "Contemporary 5 Bedroom Detached House",

        description:
          "A premium detached home featuring large living spaces, modern architecture, a private compound, and high-end finishes.",

        images: [
          "https://images.unsplash.com/photo-1605146769289-440113cc3d00",
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
        ],

        propertyType: "detached",
        listingType: "sale",

        price: 120000000,
        currency: "NGN",

        bedrooms: 5,
        bathrooms: 6,
        toilets: 7,

        area: 550,
        yearBuilt: 2025,

        furnished: true,

        features: [
          "Swimming Pool",
          "Smart Home",
          "Private Garage",
          "Cinema Room",
          "Security",
          "Garden",
          "Fitted Kitchen",
          "Boys Quarters",
        ],

        location: {
          address: "8 Palm Estate",
          area: "Maitama",
          city: "Abuja",
          state: "FCT",
          country: "Nigeria",

          coordinates: {
            latitude: 9.076,
            longitude: 7.482,
          },
        },

        agent: david?._id,

        rating: 4.9,
        reviewsCount: 41,

        verified: true,
        featured: true,

        views: 2130,
        favorites: 132,
      },

      {
        name: "Cozy 2 Bedroom Apartment",

        description:
          "A comfortable 2-bedroom apartment perfect for young professionals or a small family, located close to major amenities.",

        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
        ],

        propertyType: "apartment",
        listingType: "rent",

        price: 2800000,
        currency: "NGN",

        bedrooms: 2,
        bathrooms: 2,
        toilets: 3,

        area: 120,
        yearBuilt: 2022,

        furnished: false,

        features: [
          "Parking Space",
          "Security",
          "Water Supply",
          "Balcony",
          "Prepaid Meter",
        ],

        location: {
          address: "15 Unity Street",
          area: "Wuse 2",
          city: "Abuja",
          state: "FCT",
          country: "Nigeria",

          coordinates: {
            latitude: 9.0579,
            longitude: 7.4951,
          },
        },

        agent: sarah?._id,

        rating: 4.3,
        reviewsCount: 12,

        verified: true,
        featured: false,

        views: 540,
        favorites: 27,
      },
    ];

    await Property.deleteMany({});

    await Property.insertMany(properties);

    console.log("Properties seeded successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding properties:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

seedProperties();
