const User = require('../../models/user')

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find()
        return users
      }
      catch (err) {
        throw new Error(err)

      }
    }
  },
  Mutation: {
    register(_, args, context, info) {
      
    }
  }
}
