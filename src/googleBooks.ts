import axios from 'axios';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Import UUID function

dotenv.config();

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

export async function fetchBooks(requiredBooks: number): Promise<Book[]> {
  let books: Book[] = [];
  let startIndex = 0;
  const maxResults = 20;

  while (books.length < requiredBooks) {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: '*',
        key: GOOGLE_BOOKS_API_KEY,
        startIndex,
        maxResults,
      },
    });
    const items = response.data.items;

    if (!items) {
      break;
    }

    const validBooks = items
      .filter((item: any) => item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail)
      .map((item: any) => ({
        id: uuidv4(),
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        thumbnail: item.volumeInfo.imageLinks.thumbnail,
      }));

    books = [...books, ...validBooks];
    startIndex += maxResults;

    if (validBooks.length === 0) {
      console.log("break")
      break; 
    }
  }
  return books.slice(0, requiredBooks);
}