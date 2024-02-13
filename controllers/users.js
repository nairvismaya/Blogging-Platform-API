import Users from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const randomToken = crypto.randomBytes(64).toString("hex");
export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const userCount = await Users.count({
      where: {
        email,
      },
    });

    if (userCount > 0) {
      return res.status(400).send("Email already exists!!!");
    }

    try {
      const newUser = await Users.create({
        email,
        username,
        password: await bcrypt.hash(password, 15),
      });

      console.log("New user created:", newUser.toJSON());
      return res.status(200).send("Registration successful");
    } catch (createError) {
      console.error("Error creating user:", createError);
      return res.status(500).send("Error in registration");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error in registration");
  }
};

export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      console.error("Email not found");
      return res.status(404).json("Email not found");
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      console.error("Incorrect password");
      return res.status(404).json("Incorrect password");
    }

    const token = jwt.sign({ id: user.id }, randomToken, {
      expiresIn: "1h",
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    console.error("Sign in error:", err);
    return res.status(500).send("Sign in error");
  }
};
