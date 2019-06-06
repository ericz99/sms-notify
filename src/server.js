const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./db");
const { PORT, MONGO_URI } = require("./config");

(async () => {
  // Connect ot DB
  await connectDB(MONGO_URI);

  // Middlewares
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Main API Route
  app.use("/api/admin", require("./routes/api/AdminRoute"));

  // CLIENT SIDE RESOURCE
  if (process.env.NODE_ENV === "production") {
    // set static path folder
    app.use(express.static("client/build"));

    // and catch all routes and render the build html folder
    app.get("*", (req, res, next) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  http.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})();
