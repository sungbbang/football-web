const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: '인증 정보(토큰)가 없습니다.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: '유효하지 않거나 만료된 토큰입니다.' });
  }
};

module.exports = {
  authenticateToken,
};
