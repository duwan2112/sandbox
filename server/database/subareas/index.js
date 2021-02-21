const {MoodOutlined} = require("@material-ui/icons");
const {SubArea} = require("../schema");

async function createSubArea(data) {
  return new Promise(async (resolve, reject) => {
    const subarea = await SubArea.findOne({
      subareaId: data.subareaId,
    });
    if (subarea) {
      return reject(false);
    }
    return resolve(await SubArea.create({...data}));
  });
}

async function getSubAreasByUserId(userId) {
  return await SubArea.find({userId});
}

async function deleteSubArea(id) {
  return await SubArea.deleteOne({_id: id});
}

async function getSubareaById(id) {
  return await SubArea.findById({_id: id});
}
async function getSubareaBySubName(id) {
  return await SubArea.findOne({subareaName: id});
}

async function updateSubarea(id, data) {
  return await SubArea.findByIdAndUpdate(
    {_id: id},
    {
      ...data,
    }
  );
}

module.exports = {
  createSubArea,
  getSubAreasByUserId,
  deleteSubArea,
  getSubareaById,
  updateSubarea,
  getSubareaBySubName,
};
