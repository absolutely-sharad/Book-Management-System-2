import express from 'express';
import { createBook,findBooks} from '../controllers/BookControllers.mjs';
const router = express.Router();
export default router;
router.post('/books/add',createBook);
router.get('/books',findBooks);