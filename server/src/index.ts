import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./auth";
import requestsRoutes from "./requests";
import socRoutes from "./soc";
import adminRoutes from "./admin";
import initDb from "./schema";
import dotenv from "dotenv";

dotenv.config();

// Initialize DB
initDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/soc", socRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Zer0-P0!nT API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
