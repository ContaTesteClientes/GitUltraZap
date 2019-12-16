'use strict'

class AuthRegisterAttendant {
	get rules () {
		return {
            name: 'required'
		}
	}

    get validateAll () {
      return true
    }
}

module.exports = AuthRegisterAttendant
