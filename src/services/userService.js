const User = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
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
        return "Create Access Token";
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

module.exports = {
  createUserService,
  handleLoginService,
};
