import userModel from '../models/userModel.js'

//Add item to user cart (POST)
const addToCart = async(req,res) =>{
    try {
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] = cartData[req.body.itemId] + 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//Remove item from user cart (POST)
const removeFromCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//Get user cart (GET)
const getCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        res.json({success:false,message:"Error"});
    }
}

export {getCart,removeFromCart,addToCart};