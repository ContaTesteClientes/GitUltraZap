export default async ({ Vue, ssrContext }) => {
  Vue.prototype.$clearError = function (field, target = this.errors) {
    if (!target || !field) {
      console.error('target not found. Revise the code!')

      return
    }

    let result = target

    for (let index = 0; index < result.length; index++) {
      const e = result[index]

      if (field === e.field) {
        result.splice(index, 1)
      }
    }

    target = result
  }

  Vue.prototype.$isInputValid = function (field, target = this.errors) {
    if (!target) {
      console.error('target not found. Revise the code!')

      return
    }

    return !!target.filter(e => e.field === field).length
  }

  Vue.prototype.$showInputError = function (field, target = this.errors) {
    if (!target) {
      console.error('target not found. Revise the code!')

      return
    }

    let string = target.filter(e => e.field === field).map(e => e.message).join(', ')
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
