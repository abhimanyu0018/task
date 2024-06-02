import express from "express"
import cors from "cors";


const app = express()



app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      Credential: true,
    })
  );


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


//routes

import userRouter from "./routes/user.routes.js";
app.use('/api/user', userRouter)

import postsRouter from "./routes/post.routes.js"
app.use('/api/posts', postsRouter )

export default app;