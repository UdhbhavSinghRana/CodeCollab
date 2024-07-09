import mongoose, { Schema, Document, ObjectId, Model } from "mongoose";

export interface ILink extends Document {
  title: string;
  code?: string;
  userId: ObjectId;
}

const linkSchema: Schema<ILink> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    code: {
      type: String
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const linkModel: Model<ILink> = mongoose.model("Link", linkSchema);

export default linkModel;