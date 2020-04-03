const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// api/auth
router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimal 6 symbol").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data registration"
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: "Что то пошло не так...." });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Write correct data")
      .normalizeEmail()
      .isEmail(),
    check("password", "Wite your password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data in system login"
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign({userId: user.id}, config.get('JWT_TOKEN'), {expiresIn: "1h"})
      res.json({ token , userId: user.id})
    } catch (e) {
      res.status(500).json({ message: "Что то пошло не так...." });
    }
  }
);
module.exports = router;
