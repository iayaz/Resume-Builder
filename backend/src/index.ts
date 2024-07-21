import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { authenticate } from "./middleware/auth";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(authenticate);
app.use((req, res) => {
  res.json({ msg: "second middleware" });
});
app.listen(PORT, () => {
  console.log(`Started the Server on ${PORT}`);
});
