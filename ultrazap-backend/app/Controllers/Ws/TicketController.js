'use strict'

class TicketController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = TicketController
