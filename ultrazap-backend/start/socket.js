'use strict'


const Ws = use('Ws')

Ws
    .channel('qrcode:*', 'QrcodeController')
    .middleware(['auth'])

Ws
    .channel('tickets:*', 'TicketController')
    .middleware(['auth'])
