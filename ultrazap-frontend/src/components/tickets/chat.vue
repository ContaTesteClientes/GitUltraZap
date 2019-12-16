<template>
    <div class="chat">
        <div class="messages-container q-pa-sm scroll" ref="messages">
            <template
                v-for="(item, index) in ticket.messages"
            >
                <q-chat-message
                    :name="item.origin === 'external' ? item.from : 'eu'"
                    :key="index"
                    :stamp="item.created_at"
                    :sent="item.origin !== 'external'"
                    v-if="ticketId"
                >
                  <div
                    v-if="!item.type"
                  >
                    {{item.body}}
                  </div>

                  <div
                    v-else-if="item.type == 'jpeg' && item.body"
                  >
                    <img
                      :src="`${$store.getters.v1}attachs/${item.body}`"
                      width="30%"
                    >
                  </div>

                  <div
                    v-else-if="item.type == 'oga' && item.body"
                  >
                    <audio controls preload="none" style="width:480px;">
                      <source
                        :src="`${$store.getters.v1}attachs/${item.body}`"
                        type="audio/ogg"
                      />
                    </audio>
                  </div>

                  <div
                    v-else-if="item.type == 'mp4' && item.body"
                  >
                    <video controls preload="none" style="height:480px;">
                      <source
                        :src="`${$store.getters.v1}attachs/${item.body}`"
                        type="video/mp4"
                      />
                    </video>
                  </div>

                  <div
                    v-else
                  >
                    <a :href="`${$store.getters.v1}attachs/${item.body}`">
                      Enviei um anexo do tipo {{item.type}} clique aqui para baixar e ve-lo
                    </a>
                  </div>

                </q-chat-message>
            </template>

            {{ticket.message}}
        </div>

        <div class="send-container row">
            <div class="col-12">
                <q-input
                    v-model="form.body"
                    @keydown.enter="send"
                    filled
                    square
                >
                    <q-btn
                        @click="send"
                        slot="append"
                        icon="send"
                        round
                        flat
                    />
                </q-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['ticketId'],

  data () {
    return {
      form: {
        ticket_id: '',

        body: ''
      }
    }
  },

  watch: {
    'ticketId': 'scrollToEnd',
    'ticket.messages': 'scrollToEnd'
  },

  mounted () {
    this.scrollToEnd()
  },

  methods: {
    scrollToEnd () {
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    },

    async send () {
      try {
        this.form.ticket_id = this.ticket.id

        await this.$store.dispatch('ticket/sendMessage', this.form)
        this.form.body = ''
        this.scrollToEnd()
      } catch (error) {

      }
    }
  },

  computed: {
    ticket () {
      if (!this.ticketId) return {}

      return this.$store.state.ticket.all.filter(e => e.id === this.ticketId)[0]
    }
  }
}
</script>

<style scoped>
.chat {
    height: calc(100vh - 50px);
    position: relative;
}

.messages-container {
    height: calc(100vh - 106px);
    max-height: calc(100vh - 106px)
}

.send-container {
    width: 100%
}
</style>
