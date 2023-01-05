require("dotenv").config();
const express = require("express");
const cors = require("cors");
//routes
const userRoutes = require("./routes/userRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
//DB
const DbConnection = require("./db/DbConnection");
DbConnection();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/services", servicesRoutes);

app.get("/", (req, res) => {
  return res.json({
    msg: "Greetings from MeGo",
  });
});
app.listen(process.env.PORT || 5500, () => {
  console.log("App is running on port ", process.env.PORT);
});
