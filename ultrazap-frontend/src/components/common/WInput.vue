<template>
  <q-input
    :id="name"
    :name="name"
    bg-color="white"
    v-model="internalValue"
    @blur="$emit('blur')"
    @keydown="$clearError(name, errors)"
    :error="$isInputValid(name, errors)"
    :error-message="$showInputError(name, errors)"
    v-bind="$attrs"
  />
</template>
<script>
// Basic input for forms
// @group widgets
export default {
  name: 'input-custom',
  props: {
    // Used to search the error and input ID
    'name': { type: String, required: true },
    'value': { type: [String, Number] },
    'errors': { type: [Object, Array], required: true }
  },
  computed: {
    internalValue: {
      get () {
        return this.value
      },
      set (e) {
        this.$emit('input', e)
      }
    }
  }
}
</script>
