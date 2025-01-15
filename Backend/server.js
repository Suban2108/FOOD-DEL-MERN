import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import FoodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"

import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//db Connection
connectDB();

//API endpoint
app.use('/api/food',FoodRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter);
app.use('/images',express.static('uploads')),

app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://Suban:Suban2004@fd-del.onw2f.mongodb.net/?