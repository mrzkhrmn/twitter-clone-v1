import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const createUser = asyncHandler(async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      isAdmin,
      profileImage,
      followers,
      following,
      description,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
      followers,
      following,
      description,
      profileImage,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      followers: newUser.followers,
      following: newUser.following,
      description: newUser.description,
      profileImage: newUser.profileImage,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
});

export const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.description = req.body.description || user.description;
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      followers: updatedUser.followers,
      following: updatedUser.following,
      description: updatedUser.description,
      profileImage: updatedUser.profileImage,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    res.status(404).json(error.message);
    next(error);
  }
});

export const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (isPasswordValid) {
        generateToken(res, existingUser._id);

        res.status(200).json({
          _id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
          followers: existingUser.followers,
          following: existingUser.following,
          description: existingUser.description,
          profileImage: existingUser.profileImage,
        });
        return;
      }
    } else {
      throw new Error("Cant find user!");
    }
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
});

export const logout = asyncHandler(async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json(error.message);
    next(error);
  }
});
