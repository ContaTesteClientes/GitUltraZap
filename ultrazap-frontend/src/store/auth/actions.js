import axios from 'axios'
import notify from '../../js/notify'

export async function login (ctx, data) {
  let url = `${ctx.rootGetters.v1}auth`

  try {
    let response = await axios.post(url, data)

    ctx.commit('token', response.data.token, { root: true })

    return response.data
  } catch (error) {
    if (error.response && error.response.status >= 500) {
      notify('negative', 'Um erro de comunicação ou no servidor aconteceu. Tente novamente.')

      return
    }

    if (error.response && error.response.status >= 400 && error.response.data.length) {
      notify('negative', 'Verifique os valores inseridos.')

      throw error.response.data
    }
  }
}

export async function me (ctx, data) {
  let url = `${ctx.rootGetters.v1}auth/me`

  try {
    let response = await axios.get(url, { headers: ctx.rootGetters.headers })

    ctx.commit('me', response.data)

    return response.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      notify('negative', 'Acesso não autorizado.')

      throw new Error('Acesso não autorizado.')
    }
  }
}

export async function registerUser (ctx, data) {
  let url = `${ctx.rootGetters.v1}auth/register/user`

  try {
    let response = await axios.post(url, data)

    return response.data
  } catch (error) {
    if (error.response && error.response.status >= 500) {
      notify('negative', 'Um erro de comunicação ou no servidor aconteceu. Tente novamente.')

      return
    }

    if (error.response && error.response.status >= 400 && error.response.data.length) {
      notify('negative', 'Verifique os valores inseridos.')

      throw error.response.data
    }
  }
}

export async function registerUserRole (ctx, data) {
  const registerRouteByRole = data.role

  let url = `${ctx.rootGetters.v1}auth/register/${registerRouteByRole}`

  try {
    let response = await axios.post(url, data)

    return response.data
  } catch (error) {
    if (error.response && error.response.status >= 500) {
      notify('negative', 'Um erro de comunicação ou no servidor aconteceu. Tente novamente.')

      return
    }

    if (error.response && error.response.status >= 400 && error.response.data.length) {
      notify('negative', 'Verifique os valores inseridos.')

      throw error.response.data
    }
  }
}
