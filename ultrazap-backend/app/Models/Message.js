'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
    client () {
      return this.belongsTo('App/Models/Client')
    }
    
    ticket () {
        return this.belongsTo('App/Models/Ticket')
    }
}

module.exports = Message
