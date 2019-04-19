'use strict'
import { decodeToken } from '../utils/security'

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {})
  user.associate = (models) => {
    // associations can be defined here
  }
  user.findByToken = async(token) => {
    const data = decodeToken(token)

    if (!data) return null

    const currentUser = await user.findOne({ id: user.id })
    return currentUser
  }
  return user
}
