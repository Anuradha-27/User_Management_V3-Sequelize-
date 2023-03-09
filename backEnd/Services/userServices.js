const db = require('../Models/index.js');
const User = db.user
const State = db.state
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');
const e = require('express');
// const { sequelize } = require('../Models/index.js');

setData = (data)=>{
  let empArray=[];
  for(i=0;i<data.length;i++){
    const userData=data[i];
    const stateData=data[i].state;
    const resp ={
      u_id:userData.u_id,
      f_name:userData.f_name,
      m_name:userData.m_name,
      l_name:userData.l_name,
      email:userData.email,
      password:userData.password,
      gender:userData.gender,
      apart_name:userData.apart_name,
      locality:userData.locality,
      landmark:userData.landmark,
      dob:userData.dob,
      city:userData.city,
      pinCode:userData.pinCode,
      state_name:stateData.state_name,

    }
 
    empArray.push(resp)

  }
 
  return empArray;
}
exports.getSingleUserService = async (emailId ) => {
  // const tasks = await User.findAll( {email:{[Op.like]:`%${email}%`},include:State}) //for all email
  // // const tasks = await User.findOne({email,include:State}) //for one email
  const tasks = await User.findAll({
    where: {
      [Op.and]: [
        {
          del:{
            [Op.eq]:"0"
          }
        },
        {
          email:{
            [Op.like]:`%${emailId}%`
          }
        }
      ]
    }, include: State,
  }) 
    console.log(tasks.user);
  return await setData(tasks)
  
}
exports.getAllUsersServices = async () => {

  const tasks = await User.findAll({
    where: {
      del: '0',
    }, include: State
  })
  return setData(tasks)

}

exports.addUserService = async (bodyData) => {
  const hash = bcrypt.hashSync(bodyData.password, 10);
  bodyData.password = hash;
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
        u_id: userResp.u_id

      }, { transaction: t });

    })
    return true;
  } catch (error) {
    console.log(error)
  }
}

exports.updateUserService = async (bodyData, uid,) => {
  await db.sequelize.transaction(async (t) => {
    const updateUser = await User.update(
      bodyData,
      { where: { u_id: uid } },
      { transaction: t });

    const stateResp = await State.update(
      bodyData,
      { where: { u_id: uid } },
      { transaction: t });
  })
  return true;
}

exports.deleteUserService = async (id) => {
  const tasks = await User.update({ del: "1" }, { where: { u_id: `${id}` } })
  return tasks;
}