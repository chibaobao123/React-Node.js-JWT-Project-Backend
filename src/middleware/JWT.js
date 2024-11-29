const JWT_Middleware = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
  } else {
    return res.json({ error: "No credentials sent!" });
  }
};

module.exports = JWT_Middleware;
