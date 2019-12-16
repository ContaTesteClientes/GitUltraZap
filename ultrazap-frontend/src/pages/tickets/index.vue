<template>
    <div class="row">
        <div class="col-3 scroll bg-grey-2 sidemenu q-px-sm">
            <q-list>
                <q-item >
                    <q-item-section>
                        <q-item-label>Tickets de suporte</q-item-label>
                    </q-item-section>
                </q-item>

                <template
                  v-for="(item, index) in tickets"
                >
                  <q-item
                    @click="selected = item"
                    :active="selected === item"
                    :key="index"
                    clickable
                  >
                      <q-item-section>
                          <q-item-label>{{item.from}}</q-item-label>
                      </q-item-section>
                  </q-item>
                </template>
            </q-list>
        </div>

        <div class="col">
          <chat
            :ticket-id="selected.id"
            v-if="selected"
            ref="chat"
          />
        </div>
    </div>
</template>

<script>
import chat from '../../components/tickets/chat'

export default {
  components: {
    chat
  },

  data () {
    return {
      selected: null
    }
  },

  created () {
    this.load()

    let subs = `tickets:${this.$store.state.auth.me.client.phone}`

    let qrSub = this.$ws.subscribe(subs)

    qrSub.on('new', this.handleNew)
  },

  methods: {
    handleNew () {
      this.load(false)
    },

    async load (showLoad = true) {
      if (showLoad) this.$q.loading.show()

      try {
        await this.$store.dispatch('ticket/get')
      } catch (error) {

      }

      if (showLoad) this.$q.loading.hide()
    }
  },

  computed: {
    tickets () {
      return this.$store.state.ticket.all
    }
  }
}
</script>

<style scoped>
.sidemenu {
    height: calc(100vh - 50px);
    border: 1px solid rgba(0, 0, 0, 0.12)
}
</style>
