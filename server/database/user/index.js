const {User} = require("../schema");

async function getAllUsers() {
  return await User.find();
}

/**
 *
 * @param {string} field
 * @param {any} value
 */

async function getUsersByField(field, value) {
  if (value === "NOT_NULL") {
    return await User.find({[field]: {$ne: null}});
  }
  return await User.find({[field]: value});
}

async function getUserById(id) {
  return await User.findById(id).exec();
}

async function getUserByEmail(email) {
  return await User.findOne({email}).exec();
}

async function getUserByProvierId(providerId) {
  return await User.findOne({providerId}).exec();
}

async function updateUser(userId, data) {
  return await User.findByIdAndUpdate({_id: userId}, {...data});
}

async function deleteUser(userId) {
  return await User.deleteOne({_id: userId});
}

async function createUser(data) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({email: data.email});

    if (user) {
      return reject("el Email esta en uso");
    }

    return resolve(
      await User.create({
        ...data,
      })
    );
  });
}

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByProvierId,
  createUser,
  updateUser,
  getAllUsers,
  getUsersByField,
  deleteUser,
};
