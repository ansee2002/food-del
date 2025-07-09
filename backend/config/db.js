import mongoose from "mongoose";

 export const connectDB =  async () => {
 
    await mongoose.connect('mongodb+srv://ansee:33858627@cluster0.xbxgv.mongodb.net/food-del').then(()=>console.log("DB Connected"));
 }