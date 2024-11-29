const User = require("../models/user");

var jwt = require("jsonwebtoken");
require("dotenv").config();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    // check user exists
    const user = await User.findOne({ email });
    if (user) {
      console.log(`Email: ${email} already exists`);
      return null;
    }

    //hash user password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    //save user to database
    let result = await User.create({
      name,
      email,
      password: hashPassword,
      role: "admin",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const handleLoginService = async (email, password) => {
  try {
    // fetch user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        EC: 1,
        EM: "Email/Password incorrect",
      };
    }

    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password incorrect",
        };
      } else {
        // create an access token for the user
        const payload = {
          email: user.email,
          name: user.name,
        };
        var access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token,
          user: {
            email: user.email,
            name: user.name,
          },
        };
      }
    }
    //hash user password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    //save user to database
    let result = await User.create({
      name,
      email,
      password: hashPassword,
      role: "admin",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUsersService = async () => {
  try {
    // Get users
    let result = await User.find({}).select("-password");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  handleLoginService,
  getUsersService,
};
