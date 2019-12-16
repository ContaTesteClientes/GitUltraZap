'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {

    connection () {
        return this.hasOne('App/Models/Connection')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }

    tickets () {
        return this.hasMany('App/Models/Ticket')
    }
}

module.exports = Client
