'use strict'

class AuthRegisterClient {
	get rules () {
		return {
            name: 'required',
            phone: 'required'
		}
	}

    get validateAll () {
      return true
    }
}

module.exports = AuthRegisterClient
