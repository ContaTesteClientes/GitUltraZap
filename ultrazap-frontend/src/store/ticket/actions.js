import waxios from '../../../wella-components/js/wAxios'

export async function get (store) {
  let url = `${store.rootGetters.v1}tickets/`

  try {
    let response = await waxios.get(url)

    store.commit('set', response)

    return response.data
  } catch (error) {
    throw error
  }
}

export async function sendMessage (store, data) {
  let url = `${store.rootGetters.v1}tickets/send`

  try {
    let response = await waxios.post(url, data, {}, true)

    await get(store)

    return response.data
  } catch (error) {
    throw error
  }
}
