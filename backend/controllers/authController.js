import User from "../models/userModel.js";

// 📌 Register User
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, lastName, location } = req.body;

    if (!name || !email || !password) {
      return next(new Error("All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new Error("Email already in use"));
    }

    const newUser = new User({ name, email, password, lastName, location });
    await newUser.save();

    const token = newUser.createJWT();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 📌 Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("Email and password are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new Error("Invalid email or password"));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new Error("Invalid email or password"));
    }

    const token = user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, token },
    });
  } catch (error) {
    next(error);
  }
};

// 📌 Get User Profile (Protected)
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return next(new Error("User not found"));
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
      },
    });
  } catch (error) {
    next(error);
  }
};
