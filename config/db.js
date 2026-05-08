import mongoose from "mongoose";
let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const options = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/gocart`, options).then((mongoose) => {
            return mongoose;
        }
        ).catch((err) => {
            console.log("Error connecting to database", err);
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;

}