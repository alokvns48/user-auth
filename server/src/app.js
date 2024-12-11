import express from "express";
import authRoutes from "./routes/user.routes.js";
import cors from "cors";
import session from "express-session";

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use((req, res, next) => {
  console.log("Session data:", req.session);
  next();
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;
