module.exports.validateRegisterInput = (
  name,
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {}
  if (name.trim() === '') {
    errors.name = 'Name can not be empty'
  }
  if (username.trim() === '') {
    errors.username = 'Username can not be empty'
  }
  if (email.trim() === '') {
    errors.email = 'Email can not be empty'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Email should be a valid email address'
    }
  }
  if (password === '') {
    errors.password = 'Password can not be empty'
  } else if (password.length < 6) {
    errors.password = 'Password should be min 6 characters'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username can not be empty'
  }
  if (password.trim() === '') {
    errors.password = 'Password can not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}
