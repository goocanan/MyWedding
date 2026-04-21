import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import rsvpRoutes from "./routes/rsvp.routes";
import configRoutes from "./routes/config.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Better Auth handler
app.all("/api/auth/*path", toNodeHandler(auth));

// Public Routes
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/config", configRoutes);

// Admin Routes (Add middleware later to check session)
// app.use("/api/admin", authMiddleware, adminRoutes);

app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

app.listen(PORT, () => {
	console.log(`📡 Server sailing on port ${PORT}`);
});
