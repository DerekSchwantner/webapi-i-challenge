// implement your API here
const express = require("express");
const Db = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.send("Monday July 8 WebAPI Challenge");
});

server.get("/api/users", function(req, res) {
  Db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", function(req, res) {
  Db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

const port = 8000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));
