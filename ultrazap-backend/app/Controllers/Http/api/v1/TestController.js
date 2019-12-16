'use strict'

// const User = use('App/Models/User')
const pm2 = require('pm2')

class TestController {
  async test ({ auth, params, request, response }) {
    console.log(pm2.list())

    return {}
  }
}

module.exports = TestController
