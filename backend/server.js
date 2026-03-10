const express = require("express");
const cors = require("cors");
require("dotenv").config();

const passport = require("passport");
const session = require("express-session");

const connectDB = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const studentRoutes = require("./routes/studentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const alertRoutes = require("./routes/alertRoutes");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/events", eventRoutes);
app.use("/announcements", announcementRoutes);
app.use("/notifications", notificationRoutes);
app.use("/alerts", alertRoutes);
app.use("/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("Campus Air Backend Running");
});

/* ---------- SOCKET.IO SETUP ---------- */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

global.io = io;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/* ---------- SERVER START ---------- */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});