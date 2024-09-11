import { Router } from 'express';
import * as bookController from '../controllers/book.controller';

const router = Router();

router.get('/books', bookController.getBooks);

export default router;