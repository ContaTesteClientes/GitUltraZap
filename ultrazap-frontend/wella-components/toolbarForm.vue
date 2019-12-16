<template>
<form class="row toolbar-form">
  <div class="col-12  fixed q-toolbar bg-primary text-white q-py-xs">
      <list-button
        :prompt="needSaving"
        :to="backTo"
      />

      <q-btn
        :loading="loading"
        @click="$emit('submit')"
        class="q-mx-xs"
        outline
        color="white"
        icon="save"
        label="Salvar"
      />
  </div>

  <slot/>
</form>
</template>

<script>
import listButton from './listButton'
// Component for forms with basic layout and buttons
// @group widgets
export default {
  name: 'toolbar-form',
  components: {
    listButton
  },
  props: {
    // Should redirect to if the list button clicked
    backTo: [Object, String],
    // Should warn user if list button click
    needSaving: Boolean,
    loading: Boolean
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
