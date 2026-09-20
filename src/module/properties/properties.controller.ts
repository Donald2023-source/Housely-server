import type { Request, Response } from "express";
import Property from "../../models/property.ts";
import { StatusCodes } from "http-status-codes";
import Agent from "../../models/agent.ts";

export const searchProperties = async (req: Request, res: Response) => {
  try {
    const {
      search,
      location,
      type,
      listingType,
      minPrice,
      maxPrice,
      bedrooms,
    } = req.query;

    const query: any = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Location
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Property type
    if (type) {
      query.type = type;
    }

    // Listing type
    if (listingType) {
      query.listingType = listingType;
    }

    // Price
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Bedrooms
    if (bedrooms) {
      query.bedrooms = Number(bedrooms);
    }

    const properties = await Property.find(query);

    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const addProducts = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id).populate("agent");
    res.status(StatusCodes.OK).json({
      message: "Properties fetched successfully!",
      data: property,
    });
    console.log(property);
  } catch (err) {
    console.log(err);
  }
};

export const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find();
    res.status(StatusCodes.OK).json({
      message: "Properties fetched successfully",
      data: properties,
    });
  } catch (err) {
    console.log(err);
  }
};
