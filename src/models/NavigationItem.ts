import mongoose, { Schema, model, models } from "mongoose";
import type { INavigationItem } from "@/types";

const NavigationItemSchema = new Schema<INavigationItem>(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const NavigationItem = models.NavigationItem || model<INavigationItem>("NavigationItem", NavigationItemSchema);
export default NavigationItem;
