import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import folderRoutes from "./src/routes/folderRoutes";
import { swaggerUi, swaggerSpec } from "./src/config/swagger";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello!!",
  });
});
app.use("/api", folderRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
