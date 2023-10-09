const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
    //maybe check this better
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Need to be logged in to access" });
  }
  const verified = jwt.verify(token, "Mehir123");
  if (!verified) {
    return res
      .status(401)
      .json({ error: "Access denied!" });
  }
  req.user = verified.id;
  next();
};

module.exports = validateUser;