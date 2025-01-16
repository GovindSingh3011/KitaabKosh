import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "../lib/auth";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
