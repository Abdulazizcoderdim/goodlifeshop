import dotenv from "dotenv";
dotenv.config();

import authRoute from "./routes/auth.route.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);

app.use(errorMiddleware);

const bootstrap = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(
        `Server is running on port http://localhost:${PORT}/api/auth/`
      )
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
