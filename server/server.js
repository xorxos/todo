import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//routers
import todoRouter from "./routes/todoRoutes.js";
import connectDB from "./db/connect.js";

const app = express();
dotenv.config();

app.use(express.json());

// Morgan will log http requests to console
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

//routes
app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/todos", todoRouter);

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
