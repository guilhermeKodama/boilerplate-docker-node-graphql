'use strict'
import { encrypt } from '../src/utils/security'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const adminPassword = encrypt('admin')
    const demoPassword = encrypt('demo')

    return queryInterface.bulkInsert('users', [{
      email: 'admin@clevertech.biz',
      role: 'admin',
      password: adminPassword.passwordHashed,
      salt: adminPassword.salt
    }, {
      email: 'demo@clevertech.biz',
      role: 'user',
      password: demoPassword.passwordHashed,
      salt: demoPassword.salt
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
