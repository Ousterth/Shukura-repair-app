const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let records = [];
let admin = { username: "admin", password: "Admin@123" };

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === admin.username && password === admin.password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Change password endpoint
app.post("/change-password", (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (oldPassword === admin.password) {
    admin.password = newPassword;
    res.json({ success: true, message: "Password changed successfully" });
  } else {
    res.status(400).json({ success: false, message: "Old password incorrect" });
  }
});

// Add record
app.post("/records", (req, res) => {
  const record = { id: Date.now(), ...req.body };
  records.push(record);
  res.json(record);
});

// Get records
app.get("/records", (req, res) => {
  res.json(records);
});

// Search records by phone number
app.get("/records/search/:phone", (req, res) => {
  const phone = req.params.phone;
  const result = records.filter(r => r.phone.includes(phone));
  res.json(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
