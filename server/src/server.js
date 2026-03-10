import express from "express"; // backend server framework
import cors from "cors"; // allow frontend requests
import helmet from "helmet"; // security headers
import morgan from "morgan"; // request logging middleware
import "dotenv/config";
import pool from "./config/db.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API running...");
});

pool.connect()
    .then(() => console.log("PostgreSQL Connected"))
    .catch(err => console.error("DB connection error", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});