import { model, Schema } from "mongoose";

const doctorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    qualifications: [{ type: String }],
    contactNumber: { type: String, required: true },
    hospitals: [{ type: Schema.Types.ObjectId, ref: "Hospital" }],
    isDeleted: { type: Boolean, default: false },
    profilePic: { type: String },
    schedule: [{ type: Schema.Types.ObjectId, ref: "Schedule" }],
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true }
);

doctorSchema.index({ email: 1 });
doctorSchema.index({ specialization: 1 });

const Doctor = model("Doctor", doctorSchema);
export default Doctor;
