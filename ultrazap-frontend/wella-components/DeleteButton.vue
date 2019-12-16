<template>
  <q-btn
    size="sm"
    :color="deleted ? 'orange' : 'negative'"
    :icon="deleted ? 'delete_outline' : 'delete'"
    :loading="loading"
    class="q-mx-xs"
    @click="checkEmit"
  >
    <q-tooltip v-if="!deleted && !modal">
      Deletar
    </q-tooltip>

    <q-tooltip v-else-if="!modal">
      Restaurar
    </q-tooltip>
  </q-btn>
</template>

<script>
import {
  QTooltip
} from 'quasar'
// Wrapper of QButton for delete buttons
// @group widgets
export default {
  name: 'delete-button',
  props: {
    'loading': Boolean,
    'deleted': Boolean
  },
  components: {
    QTooltip
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {
    // @vuese
    // Check with a confirm before emit `deleted`
    checkEmit () {
      this.modal = true
      let action = 'deletar'
      if (this.deleted) action = 'restaurar'
      this.$q.dialog({
        title: 'Confirmar',
        message: `Deseja realmente ${action}?`,
        cancel: {
          label: 'Não',
          color: 'primary'
        },
        ok: {
          label: 'Sim',
          flat: true,
          color: 'negative'
        }
      }).onOk(() => this.$emit('delete'))
        .onDismiss(() => { this.modal = false })
    }
  }
}
</script>
