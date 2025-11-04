const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  response.status(200).send("Hello World");
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
