import dotenv from "dotenv";
dotenv.config();

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import categoriesRoute from "./routes/categories.route.js";
import brandsRoute from "./routes/brands.route.js";
import subCategoryRoute from "./routes/subcategory.route.js";
import usersRoute from "./routes/users.route.js";
import postRoute from "./routes/post.route.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import morgan from "morgan";

const app = express();

// middlewares
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/brands", brandsRoute);
app.use("/api/subcategories", subCategoryRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

app.use(errorMiddleware);

const bootstrap = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server is running on port http://localhost:${PORT}/api`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
