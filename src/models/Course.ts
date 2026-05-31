import mongoose, { Schema, model, models } from "mongoose";
import type { ICourse } from "@/types";

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    platform: {
      type: String,
      enum: ["SWAYAM", "NPTEL", "IITBombayX", "edX", "other"],
      required: true,
    },
    enrollments: { type: Number, default: 0 },
    description: { type: String, required: true },
    url: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Course = models.Course || model<ICourse>("Course", CourseSchema);
export default Course;
