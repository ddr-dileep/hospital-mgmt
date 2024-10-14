import { Document, model, Schema } from "mongoose";

const hospitalSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
    patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
    workers: [{ type: Schema.Types.ObjectId, ref: "Worker" }],
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    isDeleted: { type: Boolean, default: false },
    openingHours: { type: Date, default: Date.now() },
    closingHours: { type: Date, default: Date.now() },
    createdBy: { type: Schema.Types.ObjectId, ref: "Owner" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Owner" },
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
