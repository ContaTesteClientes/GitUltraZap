<template>
  <q-select
    ref="select"
    bg-color="white"
    v-model="internalValue"
    use-input
    v-bind="$attrs"
    :id="name"
    :name="name"
    :error="$isInputValid(name, errors)"
    :error-message="$showInputError(name, errors)"
    :options="optionsComputed"
    :multiple="multiple"
    :loading="loading"
    @blur="internalOptions = options"
    @keydown="$clearError(name, errors)"
    @filter="filterFn"
    @add="$emit('add', $event)"
  >
    <template slot="append">
      <slot name="append" />
    </template>

    <template slot="after">
      <slot name="after" />
    </template>
  </q-select>
</template>
<script>
import { QSelect } from 'quasar'
// Wraper of `QSelect`
// @group widgets
export default {
  name: 'w-select',
  components: {
    QSelect
  },
  props: {
    // Used to search the error and input ID
    'name': { type: String, required: true },
    'value': [Array, String, Number],
    'errors': Array,
    'options': Array,
    // Allow selection of multiple values, emit a array
    'multiple': Boolean,
    'loading': Boolean,
    // Mark the component to NOT auto filter and EMIT the event to the parent to filter
    'customFilter': Boolean
  },
  data () {
    return {
      internalOptions: []
    }
  },
  watch: {
    'options': 'load'
  },
  beforeMount () {
    this.load()
  },
  methods: {
    // @vuese
    // Load the basic information
    load () {
      this.internalOptions = this.options
      this.$forceUpdate()
    },
    // @vuese
    // If `customFilter`is false, filter the options, else, emit the event
    // @arg value
    // @arg update funtion to render itself
    // @emit Objet {value, update f()}
    filterFn (val, update) {
      let options = this.options
      if (val === '') {
        update(() => {
          this.internalOptions = options
        })
        return
      }
      if (this.customFilter) return this.$emit('filter', { val, update })
      update(() => {
        const needle = val.toLowerCase()
        this.internalOptions = options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    // @vuese
    // Create the internalValue if using multiple selection
    internalValueMultiple () {
      if (!this.internalOptions.length || !this.value.length) return []
      let result = []
      let value
      for (let index = 0; index < this.value.length; index++) {
        const item = this.value[index]
        value = this.internalOptions.filter(o => o.value === item)[0]
        if (value && value.label) {
          result.push(value.label)
        } else if (value) {
          result.push(item)
        }
      }
      return result
    },
    // @vuese
    // Create the internalValue if using single selection
    internalValueSingle () {
      if (!this.internalOptions.length) return ''
      let item = this.internalOptions.filter(e => e.value === this.value)[0]
      if (!item || !item.label) return ''
      return item.label
    },
    // @vuese
    // Emit `input` event for multiple selection
    emitMultiple (e) {
      let value
      let result = []
      for (let index = 0; index < e.length; index++) {
        const item = e[index]
        value = this.internalOptions.filter(o => o.label === item)[0]
        if (value && value.value && !result.includes(value.value)) {
          result.push(value.value)
        } else if (!result.includes(value)) {
          result.push(item)
        }
      }
      this.$emit('input', result)
    },
    // @vuese
    // Emit `input` event for single selection
    emitSingle (e) {
      let value = this.internalOptions.filter(o => o.label === e)[0]
      if (value && value.value) {
        e = value.value
      }
      this.$emit('input', e)
    }
  },
  computed: {
    // @vuese
    // Filter the options prop for internal use
    optionsComputed () {
      return this.internalOptions.map(e => e.label || '- sem titulo -')
    },
    internalValue: {
      get () {
        if (this.multiple) return this.internalValueMultiple()
        return this.internalValueSingle()
      },
      set (e) {
        if (this.multiple) return this.emitMultiple(e)
        return this.emitSingle(e)
      }
    }
  }
}
</script>
