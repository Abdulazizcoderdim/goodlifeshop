import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
import cookieParser from "cookie-parser";

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", );

const bootstrap = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
