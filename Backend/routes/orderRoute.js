import express from 'express'
import authMiddleWare from '../middleware/auth.js'
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from '../controller/orderController.js'

const orderRouter = express.Router();

// localhost:4000/api/order/place
orderRouter.post('/place',authMiddleWare,placeOrder);

// localhost:4000/api/order/verify
orderRouter.post('/verify',verifyOrder);

// localhost:4000/api/order/userorders
orderRouter.post('/userorders',authMiddleWare,userOrder);

orderRouter.post('/status',updateStatus);


// localhost:4000/api/order/list
orderRouter.get('/list',listOrders)






export default orderRouter;