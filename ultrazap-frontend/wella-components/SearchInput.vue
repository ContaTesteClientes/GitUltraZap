<template>
<q-input
  class="q-mx-md search-input"
  :class="{'small': $q.screen.lt.md}"
  outlined
  dense
  debounce="800"
  :value="value"
  @input="$emit('input', $event)"
  placeholder="Busca"
>
  <template v-slot:append>
    <q-icon name="search" />
  </template>
</q-input>
</template>

<script>
// Input used inside `table-custom`
// @group widgets
export default {
  name: 'search-input',
  props: ['value']
}
</script>

<style>
.search-input.small{
  max-width: 200px;
}
.search-input{
  max-width: 300px;
  display: inline-block
}
</style>
