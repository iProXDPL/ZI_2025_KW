import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
  building: mongoose.Types.ObjectId;
  capacity?: number;
  type?: string;
  createdAt: Date;
}

const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  building: {
    type: Schema.Types.ObjectId,
    ref: "Building",
    required: true,
  },
  capacity: {
    type: Number,
  },
  type: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure room name is unique per building
roomSchema.index({ name: 1, building: 1 }, { unique: true });

export default mongoose.model<IRoom>("Room", roomSchema);
