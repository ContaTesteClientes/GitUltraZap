<template>
<q-btn
  color="primary"
  :dense="$q.screen.lt.md"
  icon="edit"
  size="sm"
  class="q-mr-md"
  :to="to"
  v-bind="$attrs"
  @click="$emit('click')"
>
</q-btn>
</template>

<script>
// Button to see new form
// @group widgets
export default {
  name: 'edit-button',
  props: ['to']
}
</script>
