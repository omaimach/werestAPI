const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./models/User");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(express.json());

connectDB();

// CRUD : Create/Read/Update/Delete ==> POST/GET/PUT/DELETE
// Routes

// add users to database
app.post("/addUser", async (req, res) => {
  const { name, email, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "user already exists" });
  }
  try {
    const newUser = new User({
      name,
      email,
      phone,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.send(error.message);
  }
});

// view users

app.get("/viewUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
});

// delete user

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(`${deletedUser.name} deleted!`);
  } catch (error) {
    res.send(error.message);
  }
});

// edit a user
app.put("/editUser/:id", async (req, res) => {
  try {
    const editedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    console.log(editedUser);
    res.send(editedUser);
  } catch (error) {
    res.send(error.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on port ${PORT}`)
);
