import mongoose, { Schema, model, models } from "mongoose";
import type { ISiteSettings } from "@/types";

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    bio: { type: String, required: true },
    tagline: { type: String, required: true },
    profileImage: { type: String, default: "" },
    stats: {
      learners: { type: Number, default: 100000 },
      blogVisits: { type: Number, default: 176181 },
      yearsExperience: { type: Number, default: 25 },
      phdScholars: { type: Number, default: 3 },
    },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      blog: { type: String },
      email: { type: String, required: true },
    },
    cvUrl: { type: String, default: "" },
    phdScholars: [
      {
        name: { type: String, required: true },
        institution: { type: String, required: true },
        topic: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const SiteSettings =
  models.SiteSettings ||
  model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
export default SiteSettings;
