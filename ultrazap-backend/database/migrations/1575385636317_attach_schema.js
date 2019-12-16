'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachSchema extends Schema {
  up () {
    this.create('attaches', (table) => {
      table.increments()
      table.text('path')
      table.timestamps()
    })
  }

  down () {
    this.drop('attaches')
  }
}

module.exports = AttachSchema
