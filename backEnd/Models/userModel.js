module.exports = (sequelize,DataTypes) => {
const Users = sequelize.define('users',{
  u_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  f_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  m_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  l_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
 
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    defaultValue: "Other",
    allowNull: false,
  },
  apart_name:{
    type:DataTypes.STRING(50),
    allowNull:false,
  },
  locality:{
    type:DataTypes.STRING(50),
    allowNull:false,
  },
  landmark:{
    type:DataTypes.STRING(50),
    allowNull:false,
  },
   pinCode:{
    type:DataTypes.STRING(6),
    allowNull:false,
  },
  city:{
    type:DataTypes.STRING(50),
    allowNull:false,
  },
  del: {
    type: DataTypes.ENUM("0", "1"),
    defaultValue: "0",
    allowNull: false,
  },
});
return Users;
}


