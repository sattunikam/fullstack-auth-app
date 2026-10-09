const express = require("express")
const router = express.Router()
const {signUp, login, verify, logout} = require("../controllers/authController")
const protect = require("../middleware/authMiddleware")

router.post("/signup", signUp)
router.post("/login", login)
router.get("/verify", protect ,verify)
router.post("/logout", logout)

module.exports = router