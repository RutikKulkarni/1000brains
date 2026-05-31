import mongoose, { Schema, model, models } from "mongoose";
import type { IFilm } from "@/types";

const FilmSchema = new Schema<IFilm>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["documentary", "educational", "short"],
      required: true,
    },
    thumbnail: { type: String, default: "" },
    videoUrl: { type: String },
    awards: [{ type: String }],
    year: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Film = models.Film || model<IFilm>("Film", FilmSchema);
export default Film;
