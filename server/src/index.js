import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import { apiReference } from "@scalar/express-api-reference";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";

const app = express();
const PORT = 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KitaabKosh API",
      version: "1.0.0",
      description:
        "API documentation for KitaabKosh - A Book Management System",
      contact: {
        name: "API Support",
        email: "support@kitaabkosh.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "User authentication endpoints",
      },
      {
        name: "Books",
        description: "Book management endpoints",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            emailVerified: { type: "boolean" },
            image: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Book: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            author: { type: "string" },
            description: { type: "string", nullable: true },
            userId: { type: "string" },
            fileUrl: { type: "string", nullable: true },
            fileName: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            isPublic: { type: "boolean" },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const openApiSpec = swaggerJsdoc(options);

app.get("/openapi.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openApiSpec);
});

app.use(
  "/api-reference",
  apiReference({
    spec: {
      url: "/openapi.json",
    },
    theme: "purple",
  }),
);

const cors = require('cors');

const allowedOrigins = process.env.CLIENT_URL; 

app.use(
  cors({
    origin:function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `API Reference available at http://localhost:${PORT}/api-reference`,
  );
});
