import waxios from '../../../wella-components/js/wAxios'
// import axios from 'axios'

export async function qrcode (ctx, data) {
  let url = `${ctx.rootGetters.v1}whatsapp/qr-code`

  try {
    let response = await waxios.get(url)

    return response
  } catch (error) {
    throw error
  }
}
