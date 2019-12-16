'use strict'

const Ticket = use('App/Models/Ticket')
const Message = use('App/Models/Message')
const axios = require('axios')

class TicketController {
  async index ({ auth, params, request, response }) {
    let user = await auth.getUser()
    let client = await user.client().fetch()

    let tickets = await client.tickets().with('messages').fetch()

    return tickets
  }

  async sendMessage ({ auth, params, request, response }) {
    let user = await auth.getUser()
    let client = await user.client().with('connection').fetch()
    client = client.toJSON()

    if (!client.connection || !client.connection.port) return response.status(404).send('connection not found')

    let conn = client.connection
    
    let ticket = await Message.findOrFail(request.input('ticket_id'))

    await axios.post(`http://${conn.ip}:${conn.port}/send`, {to: ticket.from, body: request.input('body')})

    let message = new Message()
    message.client_id = client.id
    message.ticket_id = ticket.id
    message.from = user.id
    message.origin = 'user'
    message.body = request.input('body')
    await message.save()

    return message
  }
}

module.exports = TicketController
