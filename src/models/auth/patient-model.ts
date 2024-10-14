import { Document, model, Schema } from "mongoose";

const patientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
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

const Patient = model("Patient", patientSchema);
export default Patient;

export interface IPropsPatient extends Document {
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
