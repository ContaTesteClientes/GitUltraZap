'use strict'

const Client = use('App/Models/Client')
const Ticket = use('App/Models/Ticket')
const Attach = use('App/Models/Attach')
const axios = require('axios')
const Ws = use('Ws')
const Drive = use('Drive')
const requestPromice = require('request');
class WhatsappController {
    async cbQrCode ({ auth, params, request, response }) {
        console.log('qr-code', params.phone)

        const subscriptions = Ws.getChannel(`qrcode:*`).topic(`qrcode:${params.phone}`)
        
        if (subscriptions) {
            console.log('enviando para subs')
            subscriptions.broadcast('new')
        }

        return 'ok'
    }

    async mediaCallback ({ auth, params, request, response }) {
        const file = request.file('file', {
            // types: [
            //     'image',
            //     'audio',
            //     'video',
            //     'video/oga', 
            //     'audio/oga', 
            //     'application/oga',
            //     '*'
            // ],
            size: '99mb'
        })

        let path = Drive.disk('local').driver.root

        await file.move(path, {
            overwrite: true
        })
    
        if (!file.moved()) {
            console.log('e', file.error())
            return
        }

        let input = request.all()
        console.log('media callback', params.phone, input)
        
        try {
            let client = await Client.query().where('phone', params.phone).first()
    
            let ticket = await Ticket.query()
                .where('client_id', client.id)
                .where('from', input.from)
                .where('status', 'open')
                .first()
            
            if (!ticket) {
                ticket = new Ticket
                
                ticket.client_id = client.id
                ticket.from = input.from
                ticket.status = 'open'
    
                await ticket.save()
            }

            let attach = new Attach()
            attach.path = path + file.clientName
            await attach.save()

            await ticket.messages().create({
                client_id: client.id,
                from: input.from,
                origin: 'external',
                type: `${file.extname}`,
                body: attach.id,
            })

            const subscriptions = Ws.getChannel(`tickets:*`).topic(`tickets:${params.phone}`)
            
            if (subscriptions) {
                console.log('enviando para subs')
                subscriptions.broadcast('new')
            }
        } catch (error) {
            console.log('error', error)            
        }

        return 'File moved'
    }
    
    async callback ({ auth, params, request, response }) {
        let input = request.all()
        console.log('callback', params.phone, input)
        
        try {
            let client = await Client.query().where('phone', params.phone).first()
    
            let ticket = await Ticket.query()
                .where('client_id', client.id)
                .where('from', input.from)
                .where('status', 'open')
                .first()
            
            if (!ticket) {
                ticket = new Ticket
                
                ticket.client_id = client.id
                ticket.from = input.from
                ticket.status = 'open'
    
                await ticket.save()
            }

            await ticket.messages().create({
                client_id: client.id,
                from: input.from,
                origin: 'external',
                body: input.body,
            })

            const subscriptions = Ws.getChannel(`tickets:*`).topic(`tickets:${params.phone}`)
            
            if (subscriptions) {
                console.log('enviando para subs')
                subscriptions.broadcast('new')
            }
        } catch (error) {
            console.log('error', error)            
        }

        return
    }

    async qrCode ({ auth, params, request, response }) {
        let result = null

        let user = await auth.getUser()
        let client = await user.client().with('connection').fetch()
        client = client.toJSON()

        if (!client.connection || !client.connection.port) return response.status(404).send('connection not found')

        let conn = client.connection
        
        response.implicitEnd = false
        response.header('Content-type', 'image/png')

        requestPromice
            .get(`http://${conn.ip}:${conn.port}/qr-code`)
            .on('error', function(err) {
                response.status(404).send('not found')
            })
            .pipe(response.response) 
    }
}

module.exports = WhatsappController
