'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ValidatorUniqueNewProvider extends ServiceProvider {
    async _uniqueNewFn (data, field, message, args, get) {
		const Database = use('Database')

        const idValue = get(data, 'id')
        if (idValue) return

		const value = get(data, field)
		if (!value) return
		const [table, column] = args
		const row = await Database.table(table).where(column, value).first()

		if (row) {
		  throw message
		}
    }

	boot () {
		const Validator = use('Validator')

		Validator.extend('uniqueNew', this._uniqueNewFn, 'Must be unique')
	}
}

module.exports = ValidatorUniqueNewProvider
