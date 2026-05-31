import mongoose, { Schema, model, models } from "mongoose";
import type { ITestimonial } from "@/types";

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
    avatar: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    courseName: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Testimonial =
  models.Testimonial ||
  model<ITestimonial>("Testimonial", TestimonialSchema);
export default Testimonial;
