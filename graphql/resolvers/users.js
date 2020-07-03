const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const { validateRegisterInput } = require('../../util/validators')

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
  ) {
      // validating user input data
      const { valid, errors } = validateRegisterInput(
        name,
        username,
        email,
        password,
        confirmPassword) 

        if(!valid) {
          throw new UserInputError('Error', {errors})
        }
        
      // checking if user credentials already exist
      const userName = await User.findOne({ username })
      const userEmail = await User.findOne({ email })

      if (userName && userEmail) {
        throw new UserInputError('This user exists already. Please log in instead', 422)
      } 
      else if (userName) {
        throw new UserInputError('This username exists already', {errors: {
          username: 'This username is taken'
          }}
       )
      }
      else if (userEmail) {
        throw new UserInputError('This email exists already', {
          errors: {
            email: 'This email is taken'
          }
        })
      }

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
