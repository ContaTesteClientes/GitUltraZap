<template>
  <q-btn
    outline
    :disabled="loading"
    color="white"
    icon="arrow_back"
    class="q-mx-xs"
    label="Ver lista"
    @click="clicked"
  />
</template>

<script>
// Return to list view
// @group widgets
export default {
  name: 'list-buton',
  props: {
    'loading': Boolean,
    // Object/String route to redirect view
    'to': [String, Object],
    // Ask before take action
    'prompt': Boolean
  },
  methods: {
    // @vuese
    // Handle click event
    clicked () {
    //   if (this.$route.params.backTo) {
    //     if (!this.$route.params.id) this.$router.push({ name: this.$route.params.backTo, params: { form: this.$route.params.form } })
    //     if (this.$route.params.id) this.$router.push({ name: this.$route.params.backTo, params: { form: this.$route.params.form, id: this.$route.params.id } })
    //     return
    //   }
      if (this.prompt) {
        this.$q.dialog({
          title: 'Confirmar',
          message: `Deseja realmente sair sem salvar?`,
          cancel: {
            label: 'Não',
            color: 'primary'
          },
          ok: {
            label: 'Sim',
            flat: true,
            color: 'negative'
          }
        }).onOk(() => this.$router.push(this.to))
      } else {
        this.$router.push(this.to)
      }
    }
  }
}
</script>
