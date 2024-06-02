import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/index.js"


dotenv.config(
    {
        path: "./env"
    }
)

// console.log('MONGODB_URL:', process.env.MONGODB_URL); // Debug log
// console.log('PORT:', process.env.PORT); // Debug log


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("DataBase connection is failed !!!!", error);
})