import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},// user who wrote the reviw
    rating :{ type: Number, required: true, min:1, max:5},// rating (1-5 stars)
    comment:{ type:String, required:true},//review comment
    createAt:{ type:Date,default: Date.now},// timestamp
});

const foodSchema = new  mongoose.Schema({
    name:{type: String, required:true },
    description:{ type: String, required: true},
    price:{ type: Number, required: true},
    category:{ type: String, required: true},
    image:{ type: String, required: true},
    reviews:[reviewSchema], // store multiple reviews
});

const foodModel =  mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel;