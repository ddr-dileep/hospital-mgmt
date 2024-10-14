import { Document, model, Schema } from "mongoose";

const workerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    hospital: { type: Schema.Types.ObjectId, ref: "Hospital" },
    isDeleted: { type: Boolean, default: false },
    isWorking: { type: Boolean, default: true },
    joinDate: { type: Date, default: Date.now() },
    leaveDate: { type: Date },
    role: { type: String, default: "worker" },
  },
  { timestamps: true }
);

const Worker = model("Worker", workerSchema);
export default Worker;

export interface IpropsWorker extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  hospital: any;
  isDeleted: boolean;
  isWorking: boolean;
  joinDate: Date;
  leaveDate: Date;
  role: string;
}
