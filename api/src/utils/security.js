import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../../config'

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
export const generateSalt = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length) /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
export const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
  hash.update(password)
  const value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value
  }
}

export const encrypt = (password) => {
  const salt = generateSalt(16) /** Gives us salt of length 16 */
  const data = sha512(password, salt)
  return {
    password,
    passwordHashed: data.passwordHash,
    salt: data.salt
  }
}

export const validate = (password, storedPassword, salt) => {
  console.log(password, storedPassword, salt)
  const data = sha512(password, salt)
  return data.passwordHash === storedPassword
}

export const generateToken = (payload) => {
  // Payload could be an object literal, buffer or string. Please note that exp is only set if the payload is an object literal.
  if (payload === Object(payload)) {
    return jwt.sign(payload, config.tokenSecret)
  } else {
    return jwt.sign(payload, config.tokenSecret)
  }
}

export const generateForgotPasswordToken = (payload) => {
  return jwt.sign(payload, config.tokenSecret, { expiresIn: '1h' }) // expires in 24 hours
}

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, config.tokenSecret)
  } catch (e) {
    return null
  }
}
