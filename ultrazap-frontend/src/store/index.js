import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { LocalStorage } from 'quasar'

import auth from './auth'
import connection from './connection'
import whatsapp from './whatsapp'
import ticket from './ticket'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      auth,
      connection,
      whatsapp,
      ticket
    },

    state: {
      dev: false,
      api: null,
      token: null
    },

    mutations: {
      api (state, data) {
        state.api = data
      },

      v1_endpoint (state, data) {
        state.v1_endpoint = data
      },

      dev (state, data) {
        state.dev = data
      },

      token (state, data) {
        LocalStorage.set('token', data)

        axios.defaults.headers.common['Authorization'] = `Bearer ${data}`

        state.token = data
      }
    },

    getters: {
      v1 (state) {
        return `${state.api}${state.v1_endpoint}`
      },

      headers (state) {
        let result = {}

        if (state.token) result.Authorization = `Bearer ${state.token}`

        return result
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
