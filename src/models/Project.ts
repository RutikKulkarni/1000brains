import mongoose, { Schema, model, models } from "mongoose";
import type { IProject } from "@/types";

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["3d-visualization", "calligraphy", "design"],
      required: true,
    },
    images: [{ type: String }],
    tools: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project =
  models.Project || model<IProject>("Project", ProjectSchema);
export default Project;
