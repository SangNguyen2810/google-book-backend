
import express from 'express';
import { fetchBooks } from './googleBooks';

const app = express();
const port = 3000;

app.get('/books', async (req, res) => {
  try {
    const books = await fetchBooks(200);
    res.json(books);
  } catch (error) {
    res.status(500).send('An error occurred while fetching books.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

