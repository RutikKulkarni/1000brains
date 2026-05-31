import mongoose, { Schema, model, models } from "mongoose";
import type { ITalk } from "@/types";

const TalkSchema = new Schema<ITalk>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["keynote", "workshop", "panel", "guest-lecture"],
      required: true,
    },
    event: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    slidesUrl: { type: String },
    videoUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Talk = models.Talk || model<ITalk>("Talk", TalkSchema);
export default Talk;
