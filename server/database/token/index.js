const { Token } = require("../schema");
const crypto = require("crypto");

const createToken = async (userId, type) => {
  const token = crypto.randomBytes(32).toString("hex");
  return await Token.create({
    token,
    userId,
    type
  });
};

const expireToken = async id => {
  return await Token.findByIdAndUpdate(
    { _id: id },
    { expireAt: new Date(Date.now()) }
  );
};

const verifyToken = async id => {
  return await Token.findOne({
    _id: id,
    expireAt: { $gte: new Date(Date.now()) }
  });
};

module.exports = { createToken, expireToken, verifyToken };
