import { Document, model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
    medicalHistory: [{ type: Schema.Types.ObjectId, ref: "MedicalHistory" }],
    isDeleted: { type: Boolean, default: false },
    registrationDate: { type: Date, default: Date.now() },
    lastUpdated: { type: Date, default: Date.now() },
    profilePic: { type: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;

export interface IPropsUser extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  doctors: any[];
  medicalHistory: any[];
  isDeleted: boolean;
  registrationDate: Date;
  lastUpdated: Date;
  profilePic: string;
}
