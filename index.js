const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

// some middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// defaule or env port
const PORT = process.env.PORT || 3000;

app.get("/*", (req, res) => {
  res.send("Hello World");
  res.end();
});

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

// export the express apiss
module.exports = app;
