const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findUserById = (userId = '') => {
  return new Promise((resolve) => {
    User.findById(userId, (err, item) => {
      itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
      resolve(item)
    })
  })
}

module.exports = { findUserById }
