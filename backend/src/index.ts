import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { authenticate } from "./middleware/auth";
import baseRoutes from './routes/baseRouter'
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use(authenticate);
app.use('/api/v1' , baseRoutes);
app.listen(PORT, () => {
  console.log(`Started the Server on ${PORT}`);
});
