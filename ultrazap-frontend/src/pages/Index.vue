<template>
  <q-page class="flex flex-center column text-center">
    <h5 class="q-mb-sm">{{ connectionStatusMessage }}</h5>

    <q-btn
      size="xl"
      :color="mainButtonStyle.color"
      :label="mainButtonStyle.label"
      :loading="loading"
      @click="connectWhatsapp"
    />

    <img
      v-if="!loading && !error"
      :src="`${$store.getters.v1}whatsapp/qr-code?token=${$store.state.token}&time=${time}`"
      @error="error = true"
      class="q-mt-md q-pa-lg"
      width="500vw"
    />

    <div v-show="false">
      {{time}}
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      loading: false,
      error: false,
      time: 0
    }
  },

  mounted () {
    let subscriptions = `qrcode:${this.$store.state.auth.me.client.phone}`

    const subscriptionFound = Object.keys(this.$ws.subscriptions).find(subscription => subscriptions.includes(subscription))
    let qrSub = null

    if (!subscriptionFound) {
      qrSub = this.$ws.subscribe(subscriptions)

      qrSub.on('new', () => { this.handleNew() })
    } else {
      this.loading = false
    }
  },

  methods: {
    handleNew () {
      console.log('new received')
      this.loading = false
      this.error = false

      this.time += 1

      this.$forceUpdate()
    },

    async connectWhatsapp () {
      this.loading = true

      try {
        await this.$store.dispatch('connection/create')
      } catch (error) {

      }
    }
  },

  computed: {
    mainButtonStyle () {
      return {
        color: this.whatsappNotConnected ? 'positive' : 'warning',
        label: this.whatsappNotConnected ? 'Conectar' : 'Reconectar'
      }
    },

    connectionStatusMessage () {
      return this.whatsappNotConnected ? 'Gerar QR Code' : 'Gere um novo QR Code'
    }
  }
}
</script>
