import mongoose from "mongoose"

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Suban:Suban2004@fd-del.onw2f.mongodb.net/food-del")
    .then(()=>{
        console.log("DB Connected");
        
    });
}