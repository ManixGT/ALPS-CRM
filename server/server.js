import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Alps CRM Backend Running"));

app.get("/projects", async (req, res) => {
  const projects = await prisma.project.findMany({
    include: { client: true, tickets: true },
  });
  res.json(projects);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
