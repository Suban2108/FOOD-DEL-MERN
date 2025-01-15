import express from 'express'
import { addFood, listFood, removeFood } from '../controller/FoodController.js'
import multer from "multer"

const FoodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage})


// localhost:4000/api/food/add
FoodRouter.post('/add',upload.single("image"),addFood);

// localhost:4000/api/food/remove
FoodRouter.post('/remove',removeFood);



// localhost:4000/api/food/list
FoodRouter.get('/list',listFood);


export default FoodRouter;