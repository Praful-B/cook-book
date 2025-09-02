const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json);


app.use(); // -> /user , user_route_path

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
