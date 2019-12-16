'use strict'

class AuthRegisterAdmin {
	get rules () {
		return {
            name: 'required'
		}
	}

    get validateAll () {
      return true
    }
}

module.exports = AuthRegisterAdmin
