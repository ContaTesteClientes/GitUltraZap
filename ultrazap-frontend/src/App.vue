<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import { LocalStorage } from 'quasar'

export default {
  name: 'App',

  created () {
    this.$store.commit('dev', process.env.DEV)
    this.$store.commit('api', process.env.REMOTE_URL)
    this.$store.commit('v1_endpoint', process.env.V1_ENDPOINT)

    let token = LocalStorage.getItem('token')

    if (token && token !== null && token !== 'null') {
      this.$store.commit('token', token)
      this.$router.push('/dashboard')
    }
  }
}
</script>
