const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function protect(req, res, next){
   try {
    // 1. cookie madhun token ghe
    const token = req.cookies.token

    // 2. token nasel tar thamb
    if (!token) {
      return res.status(401).json({ message: "Not logged in" })
    }

    // 3. token khara aahe ka tapas
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // 4. user DB madhe aahe ka (password nako)
    const user = await User.findById(decoded.id).select("-password")
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // 5. user chi mahiti request madhe thev, mag pudhe jaau de
    req.user = user
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

module.exports = protect