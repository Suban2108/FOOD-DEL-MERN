import { log } from "console";
import foodModel from "../models/FoodModel.js";
import fs from 'fs'

//add food item (POST)
const addFood = async(req,res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        price:req.body.price,
        image:image_filename,
        description:req.body.description,
        category:req.body.category
    })

    try{
        await food.save();
        res.json({success:true,message:"Food Added"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
        
    }
}

//all food list (GET)
const listFood = async(req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food item by id (POST)
const removeFood = async(req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}