const express = require("express");
const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  res.json(req.headers);
});

app.use((req, res, next) => {
  res.cookie("name", "tobi");
  next();
});

app.use(express.static("client"));

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
