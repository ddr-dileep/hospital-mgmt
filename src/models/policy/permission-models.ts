import { Document, model, Schema } from "mongoose";

const permissionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Permission = model<IpropsPermission>("Permission", permissionSchema);

export default Permission;

export interface IpropsPermission extends Document {
  name: string;
}
