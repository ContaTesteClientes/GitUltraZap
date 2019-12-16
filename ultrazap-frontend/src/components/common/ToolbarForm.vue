<template>
  <form class="row toolbar-form">
    <div class="col-12 fixed q-toolbar bg-primary text-white q-py-xs">
      <q-btn
        outline
        :disabled="loading"
        color="white"
        icon="arrow_back"
        class="q-mx-xs"
        :label="labelGoBackTo"
        @click="navigateBackTo"
      />

      <q-btn
        :loading="loading"
        @click="$emit('submit')"
        class="q-mx-xs"
        outline
        color="white"
        icon="send"
        label="Salvar"
      />
    </div>

    <slot/>
  </form>
</template>

<script>
export default {
  name: 'toolbar-form',

  props: {
    // Should redirect to if the list button clicked
    goBackTo: [Object, String],
    // Label to the go back to button
    labelGoBackTo: {
      type: String,
      default: 'Voltar'
    },
    // Should warn user if list button click
    promptDiscardChanges: Boolean,
    loading: Boolean
  },

  methods: {
    navigateBackTo () {
      if (!this.promptDiscardChanges) return

      this.$q.dialog({
        title: 'Confirmar',
        message: `Deseja realmente sair sem salvar?`,
        cancel: {
          label: 'Não',
          color: 'negative'
        },
        ok: {
          label: 'Sim',
          flat: true,
          color: 'primary'
        }
      }).onOk(() => {
        // if goBackTo is empty, by default it redirects the user to the last viewed page
        if (!this.goBackTo) {
          this.$router.go(-1)
          return
        }

        this.$router.push(this.goBackTo)
      })
    }
  }
}
</script>

<style>
.toolbar-form {
  margin-top: 50px
}
.toolbar-form .fixed{
  margin-top: -50px;
  z-index: 1;
}
</style>
