'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('auth', 'api/v1/AuthController.login').middleware(['throttle']).validator('AuthLogin')
    Route.get('auth/me', 'api/v1/AuthController.me').middleware(['throttle', 'auth:jwt'])
    Route.post('auth/register/user', 'api/v1/AuthController.register').middleware(['throttle']).validator('AuthRegisterUser')
    Route.post('auth/register/client', 'api/v1/AuthController.registerClient').middleware(['throttle']).validator('AuthRegisterClient')

    Route.get('tickets/', 'api/v1/TicketController.index').middleware(['throttle', 'auth:jwt'])
    Route.post('tickets/send', 'api/v1/TicketController.sendMessage').middleware(['throttle', 'auth:jwt']).validator('sendToTicket')
    
    Route.get('connections/status', 'api/v1/ConnectionController.status').middleware(['throttle', 'auth:jwt'])
    Route.get('connections/create', 'api/v1/ConnectionController.create').middleware(['throttle', 'auth:jwt'])

    Route.post('whatsapp/callback/:phone', 'api/v1/WhatsappController.callback').middleware(['throttle'])
    Route.post('whatsapp/callback/:phone/media', 'api/v1/WhatsappController.mediaCallback').middleware(['throttle'])
    Route.get('whatsapp/callback/:phone/qr-code', 'api/v1/WhatsappController.cbQrCode').middleware(['throttle'])
    Route.get('whatsapp/qr-code', 'api/v1/WhatsappController.qrCode').middleware(['throttle', 'auth:jwt'])
    
    Route.get('attachs/:id', 'api/v1/AttachController.show')
    // .middleware(['throttle', 'auth:jwt'])

    Route.get('test', 'api/v1/TestController.test')
}).prefix('api/v1')
