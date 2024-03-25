const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
