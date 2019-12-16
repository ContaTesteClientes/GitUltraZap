'use strict'

const path = require('path')

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
    'adonis-throttle/providers/ThrottleProvider',
    '@adonisjs/antl/providers/AntlProvider',
    '@adonisjs/cors/providers/CorsProvider',
    '@adonisjs/framework/providers/AppProvider',
    '@adonisjs/framework/providers/ViewProvider',
    '@adonisjs/lucid/providers/LucidProvider',
    '@adonisjs/bodyparser/providers/BodyParserProvider',
    '@adonisjs/shield/providers/ShieldProvider',
    '@adonisjs/session/providers/SessionProvider',
    '@adonisjs/auth/providers/AuthProvider',
    '@adonisjs/mail/providers/MailProvider',
    '@adonisjs/lucid/providers/MigrationsProvider',
    'adonis-acl/providers/AclProvider',
    '@adonisjs/validator/providers/ValidatorProvider',
    'adonis-lucid-polymorphic/providers/PolymorphicProvider',
    '@adonisjs/websocket/providers/WsProvider',
    '@adonisjs/drive/providers/DriveProvider',
    path.join(__dirname, '..', 'providers', 'ValidatorExistProvider'),
    path.join(__dirname, '..', 'providers', 'ValidatorUniqueNewProvider'),
    path.join(__dirname, '..', 'providers', 'Geocoder/Provider')
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  'adonis-acl/providers/CommandsProvider',
  '@adonisjs/lucid/providers/MigrationsProvider',
  '@adonisjs/vow/providers/VowProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
    Throttle: 'Adonis/Addons/Throttle',
    Role: 'Adonis/Acl/Role',
    Permission: 'Adonis/Acl/Permission',
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = []

module.exports = { providers, aceProviders, aliases, commands }
