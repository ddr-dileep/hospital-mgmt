import mongoose from "mongoose";

const dbConnection = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017/hospital_management", {
            dbName: "hospital_management",
        });

    } catch (error) {
        console.log("error in db connection");
    }
}

export default dbConnection;