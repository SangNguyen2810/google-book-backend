import { ObjectId } from "mongodb";
export interface Book {
  _id: ObjectId;
  title: string;
  authors: string[];
  thumbnail: string;
}