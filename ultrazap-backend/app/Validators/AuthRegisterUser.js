'use strict'

class AuthRegisterUser {
	get rules () {
		return {
			email: 'email|required|unique:users,email',
			password: 'required|confirmed'
		}
	}

    get validateAll () {
      return true
    }
}

module.exports = AuthRegisterUser
