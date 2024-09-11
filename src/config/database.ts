import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb';
import { Book } from '../models/book.model';

const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbInstance: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (dbInstance) {
    return dbInstance;
  }
  try {
    await client.connect();
    dbInstance = client.db("book_app")
    return dbInstance;
  } catch (error) {
    throw error
  }
}

export async function getBooksCollection(): Promise<Collection<Book>> {
  const db = await connectToDatabase();
  return db.collection<Book>('book');
}