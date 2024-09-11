import { ObjectId } from "mongodb";

export interface Book {
  _id: ObjectId; // Add _id field
  title: string;
  authors: string[];
  thumbnail: string;
}