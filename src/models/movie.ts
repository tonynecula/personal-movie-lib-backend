import mongoose, { Document, Schema } from "mongoose";

export interface Movie extends Document {
  _id: string;
  title: string;
  director: string;
  yearReleased: number;
  actors: string[];
  genre: string;
  duration: number;
  language: string;
  poster: string;
  trailer: string;
  description: string;
}

const movieSchema = new Schema<Movie>(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    yearReleased: { type: Number, required: true },
    actors: { type: [String], required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true },
    language: { type: String, required: true },
    poster: { type: String, required: true },
    trailer: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

movieSchema.index({ title: 1 });

movieSchema.set("toObject", {
  virtuals: true,
});

movieSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
export default mongoose.model<Movie>("Movie", movieSchema);
