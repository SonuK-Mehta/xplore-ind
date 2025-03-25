import Place from "../models/placeModel.js";

// Create a Place
export const createPlace = async (req, res, next) => {
  try {
    const { name, description, location, lat, lng, image } = req.body;

    if (!name || !location || !lat || !lng) {
      return next(
        new Error("Name, location, latitude, and longitude are required")
      );
    }

    const newPlace = new Place({
      name,
      description,
      location,
      lat,
      lng,
      image,
    });
    await newPlace.save();

    res.status(201).json({
      success: true,
      message: "Place created successfully",
      place: newPlace,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Places
export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const places = await Place.find();
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        total: places.length,
        userId,
        places,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Place by ID
export const getPlaceById = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return next(new Error("Place not found"));
    }
    res.status(200).json({ success: true, place });
  } catch (error) {
    next(error);
  }
};

// Update Place
export const updatePlace = async (req, res, next) => {
  try {
    const { name, description, location, lat, lng, image } = req.body;
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      { name, description, location, lat, lng, image },
      { new: true, runValidators: true }
    );

    if (!updatedPlace) {
      return next(new Error("Place not found"));
    }

    res.status(200).json({
      success: true,
      message: "Place updated successfully",
      place: updatedPlace,
    });
  } catch (error) {
    next(error);
  }
};

//  Delete Place
export const deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return next(new Error("Place not found"));
    }
    res
      .status(200)
      .json({ success: true, message: "Place deleted successfully" });
  } catch (error) {
    next(error);
  }
};
