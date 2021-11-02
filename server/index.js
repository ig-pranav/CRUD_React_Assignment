const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const Data = require("./models/Details");

app.use(cors());
app.use(express.json());

const URL_LOCAL = "mongodb://localhost:27017/MERN_curdd";

const URL_CLOUD =
  "mongodb+srv://pranavmern:Welcome@123@cluster0.dmghh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//here i am using mongodb local connection

mongoose.connect(
  URL_LOCAL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
  }
);

app.post("/addEmployee", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const designation = req.body.designation;
  const department = req.body.department;
  const number = req.body.number;

  const employee = new Data({
    name: name,
    age: age,
    designation: designation,
    department: department,
    phoneNumber: number,
  });
  await employee.save();
  res.send("success");
});

app.get("/read", async (req, res) => {
  Data.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//update function

app.put("/update", async (req, res) => {
  const newName = req.body.newName;
  const newAge = req.body.newAge;
  const newDesignation = req.body.newDesignation;
  const newDepartment = req.body.newDepartment;
  const newNumber = req.body.newNumber;
  const id = req.body.id;
  try {
    await Data.findById(id, (error, result) => {
      result.name = String(newName);
      result.age = Number(newAge);
      result.designation = String(newDesignation);
      result.department = String(newDepartment);
      result.phoneNumber = Number(newNumber);
      result.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Data.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3500, () => {
  console.log("Running");
});
