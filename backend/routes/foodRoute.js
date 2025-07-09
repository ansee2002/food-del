import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs"
import authMiddleware from "../middleware/auth.js"
import { addFood, listFood, removeFood, addReview, getReviews } from "../controllers/foodController.js";
import foodModel from "../models/foodModel.js";

const foodRouter = express.Router();
// Set up storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the upload directory where files will be saved
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Rename the file
  }
});



// Initialize Multer
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for file size
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/; // Specify allowed file types
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  }
});




// Use upload.single("image") middleware before the controller function
foodRouter.post("/add", upload.single("file"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);


// new route to get only reviewed foods
foodRouter.get("/reviewed", async (req,res) => {
  try {
    const reviewedFoods = await foodModel.find({ reviews: { $not: { $size: 0 } } });
    res.json({success:true,data:reviewedFoods});
  } catch (error) {
    console.error("Error fetching reviewed foods",error);
    res.status(500).json({success:false,message:"Server error"});
  }
});

// add review routes
foodRouter.post("/:id/review",authMiddleware,addReview);
foodRouter.get("/:id/reviews",getReviews);

export default foodRouter;
