const express = require("express");
const format = require("date-format");

const app = express();

// Load YAML file
const YAML = require('yaml')
const fs = require('fs')
const swaggerDocument = YAML.parse(fs.readFileSync('./swagger.yaml', 'utf8'))

// Swagger docs configuration
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Port configuration
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/instagram", (req, res) => {
  const socialData = {
    username: "sainathpoojaryy",
    followers: 100,
    follows: 52,
    date: format.asString("dd-MM-yy | hh:mm:ss", new Date()),
  };

  res.status(200).json(socialData);
});

app.get("/api/v1/facebook", (req, res) => {
  const socialData = {
    username: "sainathpoojary",
    followers: 600,
    follows: 52,
    date: format.asString("dd-MM-yy | hh:mm:ss", new Date()),
  };

  res.status(200).json(socialData);
});

app.get("/api/v1/linkedin", (req, res) => {
  const socialData = {
    username: "sainathpoojary",
    followers: 252,
    follows: 84,
    date: format.asString("dd-MM-yy | hh:mm:ss", new Date()),
  };

  res.status(200).json(socialData);
});

app.get("/api/v1/:token", (req, res) => {
  res.status(200).send({
    params: req.params.token,
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
