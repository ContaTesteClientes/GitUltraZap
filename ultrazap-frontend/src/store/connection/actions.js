// import waxios from '../../../wella-components/js/wAxios'
import axios from 'axios'

export async function status (ctx, data) {
  let url = `${ctx.rootGetters.v1}connections/status`

  try {
    let response = await axios.get(url)

    return response.data
  } catch (error) {
    if (error.response.status === 404) return { error: error.response.data }

    throw error
  }
}

export async function create (ctx, data) {
  let url = `${ctx.rootGetters.v1}connections/create`

  try {
    let response = await axios.get(url)

    return response.data
  } catch (error) {
    throw error
  }
}
