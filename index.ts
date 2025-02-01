import express from "express";
import { config } from "dotenv";
import router from "./src/routers";
import cors from "cors";
import globalErrorHandler from "./src/middlewares/errorMiddleware";
import addAdminAccount from "./prisma/seeding/addAdminAccount";

config();

// Seed the database with an admin account
addAdminAccount();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.all("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
