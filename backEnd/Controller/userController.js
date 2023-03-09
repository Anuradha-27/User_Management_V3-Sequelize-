const validator = require("validator");

const {
  getAllUsersServices,
  addUserService,
  getSingleUserService,
  // displayByEmailService,
  updateUserService,
  deleteUserService
} = require('../Services/userServices');


const validateFields = (user) => {
  if (
    user.f_name === "" ||
    !validator.isAlpha(user.f_name) ||
    user.m_name === "" ||
    !validator.isAlpha(user.m_name) ||
    user.l_name === "" ||
    !validator.isAlpha(user.l_name) ||
    user.dob === "" ||
    user.gender === "" ||
    !validator.isAlpha(user.l_name) ||
    user.email === "" ||
    !validator.isEmail(user.email) ||
    user.password === "" ||
    user.apart_name === "" ||
    user.locality === "" ||
    user.landmark === "" ||
    !validator.isAlpha(user.city) ||

    user.pincode === "" ||
    !validator.isNumeric(user.pincode) ||
    user.state_name === ""
  ) {
    return true;
  } else {
    return false;
  }
}
exports.displayAllUser = async (req, res) => {
  var result = await getAllUsersServices();
  console.log(result.data)
  if (result) {
    res.status(200).send(result)
  } else {
    res.status(500).send("Internal error")
  }
};



exports.displaySingleUser = async (req, res) => {
  try {
    const result = await getSingleUserService(req.params.email)
    // console.log(result)
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(404).send("Please enter valid email")
    }
  } catch {
    res.status(500).send("Internal error")
  }
}
exports.addUser = async (req, res) => {
  // console.log(req.body);
  try {

    // if(validateFields(user)){
    //   res.status(400).send("Please enter appropriate data");
    // } else {

    const result = await addUserService(req.body);
    console.log(result)
    if (result) {
      res.status(200).send("data inserted....")
    } else {
      res.status(500).send("something is wrong")
    }

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }

}
exports.displayByEmail = async (req, res) => {
  try {
    console.log(req.params.email);
    const displayEmail = await displayByEmailService(req.params.email);
    if (displayEmail)
      res.status(200).send(displayEmail);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }


}
exports.deleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const serviceResponse = deleteUserService(req.params.id);
    if (serviceResponse)
      res.status(200).send({ success: true, msg: 'User deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }

}

exports.updateUser = async (req, res) => {

  try {
    const serviceResponse = await updateUserService(req.body, req.params.id);
    console.log(serviceResponse)
    if (serviceResponse) {
      res.status(200).send("user data updated successfully");
    } else {
      res.status(400).json({ error: "Record not found" });

    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });

  }
}