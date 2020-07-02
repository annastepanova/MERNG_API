const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    async register(_, { registerInput: {
      name,
      username,
      email,
      password,
      confirmPassword
    }
  }, 
  context, info) {
      // hashing a password
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        name,
        username,
        email,
        password
      })

      //saving new User in DB
      const res = await newUser.save()

      // creating JSON token
      const token = jwt.sign({
        id: res.id,
        name: res.name,
        username: res.username,
        email: res.email
      }, process.env.JWT_KEY,
        { expiresIn: '1hr' })

        return {
          ...res._doc,
          id: res._id,
          token
        }
    }
  }
}
