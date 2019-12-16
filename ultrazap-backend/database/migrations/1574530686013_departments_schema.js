'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentsSchema extends Schema {
  up () {
    this.create('departments', (table) => {
      table.increments()
      table.integer('client_id').unsigned()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('departments')
  }
}

module.exports = DepartmentsSchema
