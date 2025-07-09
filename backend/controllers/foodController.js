import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";
const addFood = async (req, res) => {
  console.log("File received:", req.body); // This should print the file details if it's successfully received
  
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image file is required." });
  }

  // Proceed with adding food
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.filename, // Use the filename stored by multer
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully!" });
  } catch (error) {
    console.error("Error saving food:", error);
    res.status(500).json({ success: false, message: "Error adding food." });
  }
};

// all food list
const listFood = async (req,res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success:true, data:foods})
  } catch (error) {
    console.log(error);
    res.json({ success:false, message:"Error"})
  }
};

// remove food item
const removeFood = async (req,res) => {
  try {
   const food = await foodModel.findById(req.body.id);
   fs.unlink(`uploads/${food.image}`,()=>{});

   await foodModel.findByIdAndDelete(req.body.id);
   res.json({ success:true, message:"Food Removed"});
  } catch (error) {
   console.log(error);
   res.json({ success:false, message:"Error"});
  }
}

//Add a review to a food item
  const addReview = async (req,res) => {
    // console.log(req.body);
    
  const {rating,comment } =req.body;
  const {id } = req.params; //food id
  const userId = req.body.userId;// ensure user is logged in

  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({success:false, message:"Food not found"});
    }


    //create new review 
    const newReview = {
      user:userId,
      rating,
      comment,
      createAt: new Date(),
    };

    food.reviews.push(newReview);
    await food.save();

    res.json({ success:true,message:"Review added successfully",data:food.reviews});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message:"Error adding review"});
  }
};

//get all reviews for a food food item
const getReviews = async (req,res) => {
  try {
    const food = await foodModel.findById(req.params.id).populate("reviews.user","name");

    if (!food || !food.reviews) {
      return res.status(404).json({success:false,message:"Food or reviews"});
    }
    
    // ensure reviews contain rating and comment
    const validateReviews = food.reviews.map((review) => ({
      user:review.user?.name || "Anonymous",
      rating: review.rating || 0,
      comment: review.comment || "No review text avaliable",
      createAt: review.createAt || new Date(),
    }));
     console.log("Sending Reviews response",validateReviews);

    res.json({success:true, reviews:validateReviews});

    
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:"Error fetching reviews"});
  }
};

//get all reviewed products
export const getReviewedFoods = async (req,res) => {
  try {
    const reviewedFoods = await foodModel.find({ "reviews.0": { $exists: true }  }); 
    re.status(200).json({success:true,data: reviewedFoods});
  } catch (error) {
    console.error("Error fetching reviewed foods:",error);
    res.status(500).json({success:false,message:"Error fetching reviewed foods"});
  }
}

export { addFood, listFood, removeFood ,addReview,getReviews};
