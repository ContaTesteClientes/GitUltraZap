<template>
  <q-page>
    <toolbar-form
      back-to="/dashboard"
      :promptDiscardChanges="promptDiscardChanges"
      :loading="loading"
      @keydown.native="alertToSaveBeforeLeave($event.target.name)"
      @submit="submit"
    >
      <div class="col-12 body">
        <div class="row q-pa-md q-col-gutter-md">
          <div class="col-md-3 col-xs-12 q-mb-sm">
            <q-card class="q-mb-md">
              <q-card-section>
                <q-radio
                  v-model="form.role"
                  val="admin"
                  label="Administrador"
                />

                <q-radio
                  v-model="form.role"
                  val="client"
                  label="Cliente"
                />

                <q-radio
                  v-model="form.role"
                  val="attendant"
                  label="Atendente"
                />

                <w-input
                  v-model="form.name"
                  type="text"
                  :disabled="loading"
                  label="Nome"
                  name="name"
                  :errors="errors"
                />

                <w-input
                  v-model="form.email"
                  type="text"
                  :disabled="loading"
                  label="E-mail"
                  name="email"
                  :errors="errors"
                />

                <w-input
                  v-model="form.password"
                  type="text"
                  :disabled="loading"
                  label="Senha"
                  name="password"
                  :errors="errors"
                />

                <w-input
                  v-model="form.password_confirmation"
                  type="text"
                  :disabled="loading"
                  label="Confirmar Senha"
                  name="password_confirmation"
                  :errors="errors"
                />

                <w-input
                  v-if="form.role === 'client'"
                  v-model="form.phone"
                  type="text"
                  mask="+## (##) #####-####"
                  :disabled="loading"
                  label="Contato"
                  name="phone"
                  :errors="errors"
                />

              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </toolbar-form>
  </q-page>
</template>

<script>
import ToolbarForm from '../../components/common/ToolbarForm'
import WInput from '../../components/common/WInput'

export default {
  data: () => ({
    promptDiscardChanges: false,
    loading: false,
    errors: [],
    form: {
      role: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone: ''
    }
  }),

  components: {
    ToolbarForm,
    WInput
  },

  methods: {
    alertToSaveBeforeLeave (target) {
      if (target) this.promptDiscardChanges = true
    },

    async submit () {
      this.loading = true

      try {
        const userID = await this.$store.dispatch('auth/registerUser', this.form)

        if (userID) {
          await this.$store.dispatch('auth/registerUserRole', { user_id: userID, ...this.form })
        }
      } catch (error) {
        this.errors = error
      }

      this.loading = false
    }
  }
}
</script>

<style>

</style>
