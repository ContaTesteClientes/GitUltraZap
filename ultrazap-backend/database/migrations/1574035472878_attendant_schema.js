'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttendantSchema extends Schema {
  up () {
    this.create('attendants', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('attendants')
  }
}

module.exports = AttendantSchema
