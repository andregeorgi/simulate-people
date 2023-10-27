const express = require("express");
const mongoose = require("mongoose");
const app = express();

const People = require("./models/People");
const PORT = process.env.PORT || 5000;

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:albastrugri@todos.nfgv3pq.mongodb.net/people",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/api/people", async (req, res) => {
  try {
    const people = await People.find({});
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/api/people", async (req, res) => {
  try {
    const { name, job, age, hobby } = req.body;
    const newUser = {
      name: name,
      job: job,
      age: age,
      hobby: hobby,
    };

    await People.create(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.put("/api/people/:id", async (req, res) => {
  try {
    const updatedPerson = req.body;
    const personId = req.params.id;

    const updatedPersonDocument = await People.findByIdAndUpdate(
      personId,
      updatedPerson,
      { new: true }
    );
    if (!updatedPersonDocument) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json(updatedPersonDocument);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.delete("/api/people/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personToDelete = await People.findById(personId);
    if (!personToDelete) {
      return res.status(404).json({ message: "Person not found" });
    }
    await People.findByIdAndRemove(personId);
    res.json({ message: "Person found and deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
