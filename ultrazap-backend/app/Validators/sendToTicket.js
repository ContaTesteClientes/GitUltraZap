'use strict'

class sendToTicket {
	get rules () {
		return {
			ticket_id: 'required|exists:tickets,id',
			body: 'required'
		}
	}

    get validateAll () {
      return true
    }
}

module.exports = sendToTicket
