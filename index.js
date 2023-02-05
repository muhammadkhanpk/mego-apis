require("dotenv").config();
const express = require("express");
const cors = require("cors");
//routes
const userRoutes = require("./routes/userRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const generalRoutes = require("./routes/generalRoutes");
//DB
const DbConnection = require("./db/DbConnection");

DbConnection();

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/general", generalRoutes);

app.get("/", async (req, res) => {
  return res.json({
    msg: "Greetings from MeGo",
  });
});
app.listen(process.env.PORT || 5500, () => {
  console.log("App is running on port ", process.env.PORT);
});
