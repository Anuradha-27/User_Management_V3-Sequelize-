
const  db = require('../Models/index.js');
 const User = db.user
 const State=db.state
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');
// const { sequelize } = require('../Models/index.js');

// exports.getAllUsersServices=async()=>{
//   const tasks = await User.findAll({include:State});
//   return tasks;

// }

exports.getAllUsersServices=async()=>{
  const tasks =await User.findAll({
    where:{
      del:'0',
    },include:State
  })  
  return tasks;

}
exports.getSingleUserService=async(emailId)=>{
  // const tasks = await User.findAll( {email:{[Op.like]:`%${email}%`},include:State}) //for all email
  // // const tasks = await User.findOne({email,include:State}) //for one email
  const tasks =await User.findOne({
    where:{
      email:emailId
    },include:State
  })
  return tasks;
}
exports.addUserService = async (bodyData) => {
  try {
    await db.sequelize.transaction(async (t) => {
      const userResp = await User.create({
        f_name: bodyData.f_name,
        m_name: bodyData.m_name,
        l_name: bodyData.l_name,
        dob: bodyData.dob,
        gender: bodyData.gender,
        email: bodyData.email,
        password: bodyData.password,
        apart_name: bodyData.apart_name,
        locality: bodyData.locality,
        landmark: bodyData.landmark,
        city: bodyData.city,
        pinCode: bodyData.pinCode,
      }, { transaction: t });

      const stateResp = await State.create({
        state_name: bodyData.state_name,
        u_id:userResp.u_id

      }, { transaction: t });
    
    })
    return true;
  } catch (error) {
    console.log(error)
  }
}

// exports.updateUserService = async (bodyData,id) => {
 
//   const updateUser = await Users.update({
//     f_name: bodyData.f_name,
//         m_name: bodyData.m_name,
//         l_name: bodyData.l_name,
//         dob: bodyData.dob,
//         gender: bodyData.gender,
//         email: bodyData.email,
//         password: bodyData.password,
//         apart_name: bodyData.apart_name,
//         locality: bodyData.locality,
//         landmark: bodyData.landmark,
//         city: bodyData.city,
//         pinCode: bodyData.pinCode, 
//         state_name:bodyData.state_name,
//       }),  { where: { id: `${id}` } }
//       }
exports.deleteUserService=async(id)=>{
  const tasks=await User.update({ del: "1" }, { where: { u_id: `${id}` } })
  return tasks;
}