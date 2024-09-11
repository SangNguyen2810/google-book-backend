import { Collection, ObjectId } from 'mongodb';
import { getBooksCollection } from '../config/database'; // Import the collection getter from db.ts
import { Book } from '../models/book.model';

export async function findBooks(title: string, authors: string[], cursor: string | null, limit: number): Promise<Book[]> {
  try {
    const booksCollection: Collection<Book> = await getBooksCollection();
    let query: any = {};

    if (cursor) {
      query = { _id: { $gt: new ObjectId(cursor) } };
    }

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (authors) {
      query.authors = { $regex: authors, $options: 'i' };
    }

    const books = await booksCollection
      .find(query)
      .limit(limit)
      .toArray();

    return books;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
}

export async function countBooks(): Promise<number> {
  try {
    const booksCollection: Collection<Book> = await getBooksCollection();

    const totalBooks = await booksCollection.countDocuments();

    return totalBooks;
  } catch (error) {
    throw new Error('Failed to count books');
  }
}