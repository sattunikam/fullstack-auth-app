const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { ReturnDocument } = require("mongodb");

async function signUp(req, res) {
  try {
    // when register time
    const { name, email, password } = req.body;

    // 1. saglya fields aahet ka?
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    // 2. password kamit kami 6 characters
    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "Password must be at least 6 characters" });
    }

    // 3. user aadhi pasun aahe ka?
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({ message: "User already exists" });
    }

    // 4. password scramble (hash) kar
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. database madhe save kar
    await User.create({ name, email, password: hashedPassword });
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // 1. fields aahet ka?
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. user database madhe aahe ka?
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. password match hoto ka?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 5. token cookie madhe thev
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

function verify(req, res) {
  res.status(200).json({ user: req.user });
}

function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logout successful" });
}

module.exports = { signUp, login, verify, logout };
