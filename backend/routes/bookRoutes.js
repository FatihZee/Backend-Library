const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Rute untuk menambahkan buku baru
router.post('/books', bookController.createBook);

// Rute lainnya
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;