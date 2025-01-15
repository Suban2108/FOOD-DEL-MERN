import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend (POST)
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  // Log the request body to ensure data is being received correctly

  try {
    const { userId, items, amount, address } = req.body;

    // Check if the required fields are present
    if (!amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Amount and Address are required fields."
      });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Storing line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Fee"
        },
        unit_amount: 2 * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

//verifying order (POST)
const verifyOrder = async (req,res) =>{
    const {orderId,success} = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:true,message:"Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//user order for frontend
const userOrder = async (req,res)=>{
  try {
    const orders =  await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

//Listing orders for admin panel (GET)
const listOrders = async (req,res)=>{ 
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

//api for updating status (POST)
const updateStatus = async (req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status updated"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export { placeOrder,verifyOrder,userOrder,listOrders,updateStatus };
