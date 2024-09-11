import { Request, Response } from 'express';
import * as bookService from '../services/book.service';

export async function getBooks(req: Request, res: Response) {
  const limit = parseInt(req.query.limit as string) || 10;
  const cursor = req.query.cursor as string | null;
  const title = req.query.title as string | "";
  const authors = req.query.authors as string[] | [];

  try {
    // Fetch paginated books using the cursor
    const books = await bookService.findBooks(title, authors, cursor, limit);

    // If there are books, set the new cursor as the last book's _id
    const nextCursor = books.length > 0 ? books[books.length - 1]._id : null;

    res.json({
      books,
      nextCursor, // Provide the cursor for the next page of results
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}
