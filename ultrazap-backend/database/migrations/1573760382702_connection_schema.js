'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConnectionSchema extends Schema {
  up () {
    this.create('connections', (table) => {
      table.increments()
      table.integer('client_id')
      table.string('ip')
      table.string('port')
      table.timestamps()
    })
  }

  down () {
    this.drop('connections')
  }
}

module.exports = ConnectionSchema
