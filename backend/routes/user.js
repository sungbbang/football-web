const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const formData = req.body;
    const { email, password, nickname } = formData;

    const existingUser = await User.findOne({
      $or: [{ email }, { nickname }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ status: 'error', message: '이미 존재하는 이메일입니다.' });
      }
      if (existingUser.nickname === nickname) {
        return res
          .status(400)
          .json({ status: 'error', message: '이미 존재하는 닉네임입니다.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      nickname,
    });

    await newUser.save();
    res
      .status(201)
      .json({ status: 'success', message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
