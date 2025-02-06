import express from "express";
import prisma from "../../prisma/index.js";
import { authenticate } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/public", async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { isPublic: true },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch public books" });
  }
});

router.get("/my-books", authenticate, async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user.id },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your books" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (!book.isPublic && (!req.user || req.user.id !== book.userId)) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

router.post(
  "/",
  authenticate,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }
      next();
    });
  },
  asyncHandler(async (req, res) => {
    try {
      const { title, author, description, isPublic } = req.body;

      if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" });
      }

      let fileUrl = null;
      let fileName = null;

      if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (cloudinaryResponse) {
          fileUrl = cloudinaryResponse.secure_url;
          fileName = req.file.originalname;
        }
      }

      const book = await prisma.book.create({
        data: {
          id: Math.random().toString(36).substr(2, 9),
          title,
          author,
          description,
          isPublic: isPublic === "true",
          userId: req.user.id,
          fileUrl,
          fileName,
        },
      });

      res.status(201).json(book);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ error: "Failed to create book" });
    }
  }),
);

router.put(
  "/:id",
  authenticate,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const book = await prisma.book.findUnique({
      where: { id: req.params.id },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this book" });
    }

    let fileUrl = book.fileUrl;
    let fileName = book.fileName;

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        fileUrl = cloudinaryResponse.secure_url;
        fileName = req.file.originalname;
      }
    }

    const updatedBook = await prisma.book.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        fileUrl,
        fileName,
      },
    });

    res.json(updatedBook);
  }),
);

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: req.params.id },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this book" });
    }

    await prisma.book.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123"
 *         title:
 *           type: string
 *           example: "The Great Gatsby"
 *         author:
 *           type: string
 *           example: "F. Scott Fitzgerald"
 *         description:
 *           type: string
 *           example: "A story of the fabulously wealthy Jay Gatsby"
 *         userId:
 *           type: string
 *           example: "user123"
 *         fileUrl:
 *           type: string
 *           example: "https://cloudinary.com/..."
 *         fileName:
 *           type: string
 *           example: "great-gatsby.pdf"
 *         isPublic:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             email:
 *               type: string
 *               example: "john@example.com"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *
 * /api/books/public:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all public books
 *     description: Retrieve a list of all public books
 *     responses:
 *       200:
 *         description: List of public books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch public books"
 *
 * /api/books/my-books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get user's books
 *     description: Retrieve all books belonging to the authenticated user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /api/books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               description:
 *                 type: string
 *                 example: "A story of the fabulously wealthy Jay Gatsby"
 *               isPublic:
 *                 type: boolean
 *                 example: true
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "book123"
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       403:
 *         description: Access denied
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a book
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "book123"
 *         description: The book ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               author:
 *                 type: string
 *                 example: "Updated Author"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               isPublic:
 *                 type: boolean
 *                 example: true
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "book123"
 *         description: The book ID
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
