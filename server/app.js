require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/output.json");
const bodyParser = require("body-parser");

connectDB();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// About
app.use("/about.json", require("./routes/about"));

// login and register with JWT (no api)
app.use("/api", require("./routes/auth"));

// api routes -- OAuth2 with Google API, facebook API, etc.

// google api
app.use("/api", require("./routes/api/google"));

// private account
app.use("/api", require("./routes/private"));

// area
app.use("/api", require("./routes/api/area"));

// discord
app.use("/api", require("./routes/api/discord"));

// microsoft
app.use("/api", require("./routes/api/microsoft"));

// facebook
app.use("/api", require("./routes/api/facebook"));

// twitter
app.use("/api", require("./routes/api/twitter"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

module.exports = app;
