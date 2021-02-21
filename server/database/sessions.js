const { Sessions } = require("./schema");

// Get All Sessions
async function getAllSessions() {
  return Sessions.find({}).exec();
}

// Sessions  by a Document Object ID
async function getSessionById(id) {
  return await Sessions.findById(id).exec();
}

//  Sessions By
async function getSessionByUserId(userId) {
  return await Sessions.findOne({ userId }).exec();
}

// Update a Sessions by Document Object ID
async function updateSession(id, data) {
  return await Sessions.findByIdAndUpdate({ _id: id }, { ...data });
}

async function deleteSession(id) {
  return await Sessions.findByIdAndDelete({ _id: id });
}

async function createSession(userId, data) {
  return new Promise(async (resolve, reject) => {
    return resolve(await Sessions.create({ userId, ...data }));
  });
}

async function deleteSessionsByUserId(userId) {
  return await Sessions.deleteMany({ userId });
}

module.exports = {
  getAllSessions,
  getSessionById,
  getSessionByUserId,
  updateSession,
  deleteSession,
  createSession,
  deleteSessionsByUserId,
};
