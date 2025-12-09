import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  room: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  title?: string;
  createdAt: Date;
}

const reservationSchema = new Schema<IReservation>({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IReservation>("Reservation", reservationSchema);
