import mongoose, { Document, Schema } from "mongoose";

export interface IBuilding extends Document {
  name: string;
  address?: string;
  createdAt: Date;
}

const buildingSchema = new Schema<IBuilding>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IBuilding>("Building", buildingSchema);
