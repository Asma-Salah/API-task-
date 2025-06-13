import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>welcome to task management API</h1>");
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await client.taskAPI.findMany({
      where: {
        isCompleted: false,
      },
    });
    res.status(200).json(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await client.taskAPI.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(newTask);
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = res.params;
    const specificTask = await client.taskAPI.findFirst({
      where: {
        id,
      },
    });
    if (specificTask) {
      return res.status(200).json(specificTask);
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await client.taskAPI.update({
      where: {
        id,
      },
      data: {
        isCompleted: true,
      },
    });
    res.status(200).json({ message: "task deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const newPatch = await client.taskAPI.update({
      where: {
        id,
      },
      data: {
        title: title && title,
        description: description && description,
      },
    });
    res.status(200).json(newPatch);
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("app is running on port 5000");
});
