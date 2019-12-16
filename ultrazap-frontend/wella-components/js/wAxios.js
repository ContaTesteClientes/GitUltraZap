import axios from 'axios'
import notify from './notify'

async function get (url, params = {}) {
  try {
    let response = await axios.get(url, params)

    return response.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      notify('negative', 'Acesso não autorizado.')

      throw new Error('Acesso não autorizado.')
    }
  }
}

async function post (url, payload, params = {}, hideNotify = false) {
  try {
    let response = await axios.post(url, payload, params)

    if (!hideNotify) notify('positive', 'Item salvo com sucesso')

    return response.data
  } catch (error) {
    if (error.response && error.response.status >= 500) {
      if (!hideNotify) notify('negative', 'Um erro de comunicação ou no servidor aconteceu. Tente novamente.')

      return
    }

    if (error.response && error.response.status >= 400 && error.response.data.length) {
      if (!hideNotify) notify('negative', 'Verifique os valores inseridos')

      throw error.response.data
    }
  }
}

export default {
  get,
  post
}
