import mongoose, { Schema, model, models } from "mongoose";
import type { ITrait } from "@/types";

const TraitSchema = new Schema<ITrait>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    targetUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Trait = models.Trait || model<ITrait>("Trait", TraitSchema);
export default Trait;
