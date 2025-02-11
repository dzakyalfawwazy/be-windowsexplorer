import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import folderRoutes from "./routes/folderRoutes";
import { swaggerUi, swaggerSpec } from "./config/swagger";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", folderRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
