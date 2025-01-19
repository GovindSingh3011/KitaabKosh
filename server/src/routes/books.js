import express from "express";
import prisma from "../../prisma/index.js";
import { authenticate } from "../middleware/auth.js";

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

router.post("/", authenticate, async (req, res) => {
  try {
    const { title, author, description, isPublic } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const book = await prisma.book.create({
      data: {
        id: Math.random().toString(36).substr(2, 9),
        title,
        author,
        description,
        isPublic: isPublic ?? false,
        userId: req.user.id,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
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
        .json({ error: "Not authorized to update this book" });
    }

    const updatedBook = await prisma.book.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

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
