const express = require("express");
const path = require("path");
require("dotenv").config();

const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connectDB();

const auth_router = require("./routes/auth");
const recipie_handler_route = require("./routes/recipeHandler");

app.use("/auth", auth_router); // -> /user , user_route_path
app.use("/recipie", recipie_handler_route);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
