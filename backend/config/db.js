const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB 연결 성공');
  } catch (error) {
    console.error(`MongoDB 연결 실패: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB 연결 해제 성공');
  } catch (error) {
    console.error(`MongoDB 연결 해제 실패: ${error.message}`);
  }
};

module.exports = { connectDB, disconnectDB };
