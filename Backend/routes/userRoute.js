import express from 'express'
import { loginUser,registerUser } from '../controller/userController.js'


const userRouter = express.Router();

// localhost:4000/api/user/register
userRouter.post('/register',registerUser);

// localhost:4000/api/user/login
userRouter.post('/login',loginUser);


export default userRouter;