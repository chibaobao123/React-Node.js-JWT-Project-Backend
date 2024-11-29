const {
  createUserService,
  handleLoginService,
  getUsersService,
} = require("../services/userService");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await createUserService(name, email, password);
  return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await handleLoginService(email, password);
  return res.status(200).json(data);
};

const getUsers = async (req, res) => {
  const data = await getUsersService();
  return res.status(200).json(data);
};

module.exports = {
  createUser,
  handleLogin,
  getUsers,
};
