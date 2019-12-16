'use strict'

class AuthLogin {
	get rules () {
		return {
			email: 'email|required|exists:users,email',
			password: 'required'
		}
	}

    get validateAll () {
      return true
    }
}

module.exports = AuthLogin