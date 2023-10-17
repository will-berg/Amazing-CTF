const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  //maybe check this better
  const tokenHeader = req.header("Authorization");
  console.log(tokenHeader)
  if (!tokenHeader) {
    console.log("no token")
    return res.status(401).json({ error: "Need to be logged in to access" });
  }

  const token = tokenHeader.split(" ")[1];
  jwt.verify(token, "Mehir123", (err, decoded) => {
    if (err) {
      console.log("token not valid")
      return res.status(401).json({ error: "Token is not valid!" });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
};

module.exports = validateUser;
