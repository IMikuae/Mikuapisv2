const express = require("express");
const cors = require("cors");
const secure = require("ssl-express-www");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(secure);
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/docs", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Example API route
app.use("/api", require("./api/routes/api"));

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Listen on Vercel port or local port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
