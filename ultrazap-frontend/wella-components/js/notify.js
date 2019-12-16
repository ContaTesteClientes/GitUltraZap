import { Notify } from 'quasar'

const notify = (data, message = '', typeOveride = null, params = null) => {
  const options = {
    positive: {
      color: 'positive',
      icon: 'check'
    },
    negative: {
      color: 'negative',
      icon: 'close'
    },
    warning: {
      color: 'orange-8',
      icon: 'warning'
    }
  }

  let configObject = {
    message: '',
    timeout: 2600,
    position: 'bottom-right',
    color: 'negative',
    icon: 'fas fa-times'
  }

  if (typeof data === 'string') typeOveride = data

  if (message) configObject.message = message

  if (typeOveride) {
    configObject.color = options[typeOveride].color
    configObject.icon = options[typeOveride].icon
  }

  if (params) configObject = params

  Notify.create(configObject)
}

export default notify
