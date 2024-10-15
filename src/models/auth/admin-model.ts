import { model, Schema } from "mongoose";

const adminSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      refPath: "createdByUser",
    },
    createdByUser: {
      type: String,
      required: true,
      enum: ["Owner", "Admin"],
    },
    isDeleleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminSchema);
export default Admin;
