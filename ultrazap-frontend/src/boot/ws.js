import Vue from 'vue'
import Ws from '@adonisjs/websocket-client'
const ws = Ws(process.env.WS_URL)

Vue.prototype.$ws = ws
