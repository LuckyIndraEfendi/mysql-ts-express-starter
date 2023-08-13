import "dotenv/config";
import express, { Request, Response } from "express";
import DatabaseMiddleware from "./config/database";
const app = express();
const PORT: Number | String = process.env.PORT || 8000;

app.use(DatabaseMiddleware);

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Welcome to Lucky Manga API",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: (err as Error).message,
    });
  }
});

app.listen(5000, () => {
  console.log(`Server listening on ${PORT}`);
});
