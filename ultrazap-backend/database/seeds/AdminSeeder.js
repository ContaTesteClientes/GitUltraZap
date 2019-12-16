'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Database = use('Database')
const User = use('App/Models/User')
const Client = use('App/Models/Client')

class AdminSeeder {

	async run () {
		// const trx = await Database.beginTransaction()

        // const admin = await Factory.model('App/Models/Admin').make()

		const user = await User.create({email: 'client@example.com', password: 'test'})
        const client = await Client.create({user_id: 1, phone: '5516996160622', })

		const user2 = await User.create({email: 'client2@example.com', password: 'test'})
        const client2 = await Client.create({user_id: 2, phone: '5516997957988', })
		// await trx.commit()
	}
}

module.exports = AdminSeeder
