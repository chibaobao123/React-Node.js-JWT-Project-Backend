require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_Middleware = (req, res, next) => {
  const white_list = ["/", "/register", "/login"];

  if (white_list.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")[1]) {
      const token = req.headers.authorization.split(" ")[1];

      //verify the token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        next();
      } catch (err) {
        return res.status(401).json({ error: "No credentials sent!" });
      }
    } else {
      //return exception
      return res.status(401).json({ error: "No credentials sent!" });
    }
  }
};

module.exports = JWT_Middleware;
