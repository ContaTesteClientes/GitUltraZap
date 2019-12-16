'use strict'

const Attach = use('App/Models/Attach')

class AttachController {
    async show ({ auth, params, request, response }) {
        let attach = await Attach.findOrFail(params.id)

        return response.download(attach.path)
    }
}

module.exports = AttachController
