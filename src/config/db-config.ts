import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const dbConnectionString = process.env.DB_CONNECTION_URL;

    await mongoose.connect(dbConnectionString!, {
      dbName: "hospital_management",
    });

    console.log("connected to DB successfully");
  } catch (error) {
    console.log("error in db connection", error);
  }
};

export default dbConnection;
