const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const upload=require("../helpers/multer")
const bookRouter = express.Router();
const Books = require("../controllers/bookController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The author of the book
 *         coverPage:
 *           type: string
 *           description: The URL to the cover image
 *         year:
 *           type: number
 *           description: The year of publication
 *       example:
 *         title: Book Title
 *         author: Book Author
 *         coverPage: http://example.com/cover.jpg
 *         year: 2020
 */

/**
 * @swagger
 * /api/books/:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book added successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
bookRouter.post(
  '/',
  protect,
  authorize('Admin', 'Author'),
  upload.single('coverPage'),
  Books.addBooks
);
// [
  // body('title').notEmpty().withMessage('Title is required'),
  // body('author').notEmpty().withMessage('Author is required'),
// ],
/**
 * @swagger
 * /api/books/:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all books
 *       500:
 *         description: Server error
 */
// authorize('Admin', 'Author', 'Reader'),
bookRouter.get('/', protect,authorize('Admin', 'Author', 'Reader'), Books.getBooks);

/**
 * @swagger
 * /api/books/search?title=harry potter:
 *   get:
 *     summary: Search all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all books
 *       500:
 *         description: Server error
 */
// authorize('Admin', 'Author', 'Reader'),
bookRouter.get('/search', protect,authorize('Admin', 'Author', 'Reader'), Books.searchBook);


bookRouter.get('/:id', protect,authorize('Admin', 'Author', 'Reader'), Books.getBookById);


/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
bookRouter.put(
  '/:id',
  protect,
  authorize('Admin', 'Author'),
  upload.single('coverPage'),
  Books.updateBook
);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
bookRouter.delete('/:id', protect, authorize('Admin'), Books.deleteBook);

module.exports = bookRouter;
