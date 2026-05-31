import mongoose, { Schema, model, models } from "mongoose";
import type { IResearch } from "@/types";

const ResearchSchema = new Schema<IResearch>(
  {
    title: { type: String, required: true },
    authors: [{ type: String }],
    journal: { type: String, required: true },
    year: { type: Number, required: true },
    abstract: { type: String, required: true },
    doi: { type: String },
    pdfUrl: { type: String },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["published", "in-progress", "funded"],
      default: "published",
    },
    fundingSource: { type: String },
  },
  { timestamps: true }
);

export const Research =
  models.Research || model<IResearch>("Research", ResearchSchema);
export default Research;
