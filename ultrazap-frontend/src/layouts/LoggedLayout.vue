<template>
  <q-layout view="hHh LpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Ultrazap - Dashboard
        </q-toolbar-title>

      </q-toolbar>

    </q-header>

    <q-drawer
      id="sideDrawer"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable exact to="/dashboard/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          :to="{ name: 'new-user' }"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cadastrar Usuário</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          :to="{ name: 'tickets' }"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Tickets de suporte</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Sair</q-item-label>

          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-if="$store.state.auth.me && wsConnected" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LoggedLayout',

  data () {
    return {
      leftDrawerOpen: false,
      wsConnected: false
    }
  },

  created () {
    this.load()
  },

  methods: {
    logout () {
      this.$store.commit('token', null)
      this.$router.push('/')
    },

    async loadWs () {
      try {
        await this.$ws.withApiToken(this.$store.state.token).connect()

        this.$ws.on('open', this.wsOpen)
      } catch (error) {
        console.log(error)
      }
    },

    wsOpen () {
      this.wsConnected = true
      console.log('ws connected')
    },

    async whatsappLoad () {
      this.loadWs()

      try {
        let response = await this.$store.dispatch('connection/status')

        if (response.error) await this.$store.dispatch('connection/create')
      } catch (error) {
      }
    },

    async load () {
      this.$q.loading.show()

      try {
        await this.$store.dispatch('auth/me')

        await this.whatsappLoad()
      } catch (error) {
        console.log(error)
        this.logout()
      }

      this.$q.loading.hide()
    }
  }
}
</script>
