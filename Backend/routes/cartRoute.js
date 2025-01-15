import express from 'express'
import { addToCart,getCart,removeFromCart } from '../controller/cartController.js'
import authMiddleware from '../middleware/auth.js'

const cartRouter = express.Router();

//localhost:4000/api/cart/add
cartRouter.post('/add',authMiddleware,addToCart);

//localhost:4000/api/cart/remove
cartRouter.post('/remove',authMiddleware,removeFromCart);


//localhost:4000/api/cart/get
cartRouter.get('/get',authMiddleware,getCart);


export default cartRouter;
