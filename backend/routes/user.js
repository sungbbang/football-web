const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: '비활성화된 계정입니다.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      user.loginAttempts += 1;

      if (user.loginAttempts >= 5) {
        user.isActive = false;
        await user.save();
        return res.status(401).json({
          status: 'error',
          message: '비밀번호를 5회 이상 틀려 계정이 비활성화되었습니다.',
        });
      }

      await user.save();
      return res.status(401).json({
        status: 'error',
        message: `비밀번호가 틀렸습니다. 남은 횟수는 ${
          5 - user.loginAttempts
        }회입니다.`,
        remainingAttemps: 5 - user.loginAttempts,
      });
    }

    user.loginAttempts = 0;
    user.isActive = true;

    await user.save();

    const payload = {
      _id: user._id,
      email: user.email,
      nickname: user.nickname,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '24h',
    });

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'strict',
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      _id: user._id,
      email: user.email,
      nickname: user.nickname,
    };

    return res.json({
      status: 'success',
      result: userResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ status: 'error', message: '이미 로그아웃된 상태입니다.' });
  }

  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });

  return res.json({ status: 'success', message: '로그아웃되었습니다.' });
});

router.post('/verify-token', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ status: 'error', message: '토큰이 없습니다.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return res.status(200).json({ status: 'success', result: decodedToken });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: 'error', message: '유효하지 않은 토큰입니다.' });
  }
});

module.exports = router;
