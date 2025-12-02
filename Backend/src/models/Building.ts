import mongoose, { Document, Schema } from "mongoose";

export interface IBuilding extends Document {
  name: string;
  description?: string;
  address?: string;
  floors?: number;
  createdAt: Date;
}

const buildingSchema = new Schema<IBuilding>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  floors: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IBuilding>("Building", buildingSchema);
