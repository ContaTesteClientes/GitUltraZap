'use strict'

const User = use('App/Models/User')
const Admin = use('App/Models/Admin')
const Attendant = use('App/Models/Attendant')
const Client = use('App/Models/Client')

class AuthController {
	async register ({ auth, params, request, response }) {
		let query = new User()

		query.email = request.input('email')
        query.password = request.input('password')

        await query.save()

        return query.id
    }

	async registerAdmin ({ auth, params, request, response }) {
		let query = new Admin()

        query.user_id = request.input('user_id')
		query.name = request.input('name')

        await query.save()

        return query
    }

	async registerClient ({ auth, params, request, response }) {
		let query = new Client()

        query.user_id = request.input('user_id')
		query.name = request.input('name')
        query.phone = request.input('phone')

        await query.save()

        return query
    }

    async login ({ auth, params, request, response }) {
        const login = await auth.attempt(request.input('email'), request.input('password'))

        return login
    }

    async me ({ auth, params, request, response }) {
        const query = await auth.getUser()

        await query
            .loadMany([
                'admin',
                'attendant',
                'client'
            ])

        return query
    }
}

module.exports = AuthController
