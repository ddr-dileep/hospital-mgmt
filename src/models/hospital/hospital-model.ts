import { Document, model, Schema } from "mongoose";

const hospitalSchema: Schema = new Schema(
  {
    name: { type: String, required: true, true: true },
    address: { type: String, required: true, unique: true, true: true },
    phone: { type: String, required: true, unique: true, true: true },
    email: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
    openingHours: { type: String, default: "10AM" },
    closingHours: { type: String, default: "6PM" },
    createdBy: { type: Schema.Types.ObjectId, ref: "Owner" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Owner" },
    speciliation: { type: String, default: "General Specification" },
  },
  { timestamps: true }
);

const Hospital = model<IPropsHospital>("Hospital", hospitalSchema);
export default Hospital;

export interface IPropsHospital extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  doctors: any[];
  patients: any[];
  workers: any[];
  services: any[];
  isDeleted: boolean;
  openingHours: Date;
  closingHours: Date;
  createdBy: string;
  updatedBy: string;
}
