import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//routers
import todoRouter from "./routes/todoRoutes.js";
import connectDB from "./db/connect.js";

const app = express();
dotenv.config();

app.use(express.json());

// secure headers
app.use(helmet());

// sanitize input
app.use(xss());

// prevent mongoDB injection
app.use(mongoSanitize());

// Morgan will log http requests to console
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/build")));

//routes
app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/todos", todoRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
