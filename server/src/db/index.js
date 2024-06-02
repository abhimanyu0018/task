import mongoose from "mongoose"

const DB_NAME = "Task"
const connectDB =async () => {
    try {
        const connection =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n mongoDB connected !! DB HOST: 
        ${connection.connection.host}`)

    } catch (error) {
        console.error("MONGODB connection ERROR: ",error)
        process.exit(1) 
        
    }   
 
}

export default connectDB;