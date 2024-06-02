import express from "express"
import verifyToken from "../middlewares/auth.js";
import {getPostController} from "../controllers/post.controller.js"


const postRouter = express.Router();

postRouter.get('/', verifyToken, getPostController );
 
export default postRouter;
