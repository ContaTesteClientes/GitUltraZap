'use strict'

const { test, trait, before } = use('Test/Suite')('Auth')

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')

test('[POST] api/v1/auth/ - login', async ({ client, assert }) => {
	const response1 = await client
		.post('/api/v1/auth')
		.header('accept', 'application/json')
		.send({
            "email": "test@example.com",
            "password": "test",
		})
        .end()

    response1.assertStatus(200)
	response1.assertJSONSubset({'type': "bearer"})
})

test('[POST] api/v1/auth/register - email is required ', async ({ client, assert }) => {
	const response1 = await client
		.post('/api/v1/auth')
		.header('accept', 'application/json')
		.send({
            "email": "",
            "password": "test",
		})
        .end()

    response1.assertStatus(400)
	response1.assertJSONSubset([{"message":"required validation failed on email","field":"email","validation":"required"}])
})

test('[POST] api/v1/auth/register - password is required ', async ({ client, assert }) => {
	const response1 = await client
		.post('/api/v1/auth')
		.header('accept', 'application/json')
		.send({
            "email": "test@example.com",
            "password": "",
		})
        .end()

    response1.assertStatus(400)
	response1.assertJSONSubset([{"message":"required validation failed on password","field":"password","validation":"required"}])
})
