'use strict'

const Connection = use('App/Models/Connection')
const Env = use('Env')
const axios = use('axios')

class ConnectionController {
    async create ({ auth, params, request, response }) {
      let targets = Env.get('CONNECTION_TARGET').split(',')
      let user = await auth.getUser()
      let client = await user.client().fetch()
      let connection = await client.connection().fetch()

      if (!connection) {
          connection = new Connection()
          connection.client_id = client.id
          connection.ip = targets[0]
      } else {
        await axios.get(`http://${targets[0]}:81/delete/${connection.port}`)
      }

      let phone = client.phone
        .split("+").join("")
        .split("(").join("")
        .split(")").join("")
        .split("-").join("")
        .split(" ").join("")

      let url = `http://${targets[0]}:81/start/${phone}`
      let get = await axios.get(url)

      connection.port = get.data.port

      await connection.save()

      return 'ok'
    }

    async status ({ auth, params, request, response }) {
      let targets = Env.get('CONNECTION_TARGET').split(',')
      let user = await auth.getUser()
      let client = await user.client().fetch()
      let connection = await client.connection().fetch()

      if (!connection) return response.status(404).send('does not have a connection')

      return 'ok'
    }
}

module.exports = ConnectionController
