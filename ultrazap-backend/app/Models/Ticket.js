'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {
  client () {
    return this.belongsTo('App/Models/Client')
  }

  departament () {
    return this.belongsTo('App/Models/Departament')
  }
  
  messages () {
    return this.hasMany('App/Models/Message')
  }
}

module.exports = Ticket
