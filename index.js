// implement your API here
const express = require("express");
const Db = require("./data/db");

const server = express();

server.use(express.json());

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
  const { id } = req.params;
  console.log(id);
  Db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);

  Db.insert(userInfo)
    .then(user => {
      if (user) {
        res.status(204).send(user);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  Db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else if (!id) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

const port = 8000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));
