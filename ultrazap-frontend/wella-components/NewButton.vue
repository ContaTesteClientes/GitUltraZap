<template>
<q-btn
  color="primary"
  :dense="$q.screen.lt.md"
  icon="add"
  class="q-mr-md"
  :to="to"
  v-bind="$attrs"
  @click="$emit('click')"
>
  <span
    class="gt-sm"
  >
    Novo
  </span>
</q-btn>
</template>

<script>
// Button to see new form
// @group widgets
export default {
  name: 'new-button',
  props: ['to']
}
</script>
