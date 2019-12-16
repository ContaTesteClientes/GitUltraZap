<template>
  <div class="signup-row row q-pl-md q-py-md">
    <div class="col-xl-4 col-md-4 col-11">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Cadastrar usuário</div>
        </q-card-section>

        <q-card-section>
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
            type="password"
            :disabled="loading"
            label="Senha"
            name="password"
            :errors="errors"
          />

          <w-input
            v-model="form.password_confirmation"
            type="password"
            :disabled="loading"
            label="Confirmar Senha"
            name="password_confirmation"
            :errors="errors"
          />

          <w-input
            v-model="form.phone"
            type="text"
            mask="+## (##) #####-####"
            :disabled="loading"
            label="Whatsapp"
            name="phone"
            :errors="errors"
          />

        </q-card-section>

        <q-separator />

        <q-card-actions class="row">
          <q-btn
            color="positive"
            @click="submit"
          >
            Criar conta
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import WInput from '../../components/common/WInput'

export default {
  components: {
    WInput
  },

  data: () => ({
    loading: false,
    errors: [],
    form: {
      role: 'client',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone: ''
    }
  }),

  methods: {
    async submit () {
      this.loading = true

      try {
        const userID = await this.$store.dispatch('auth/registerUser', this.form)

        this.form.phone = [ ...this.form.phone ].filter(char => char.match(/\d/)).join('')

        await this.$store.dispatch('auth/registerUserRole', { user_id: userID, ...this.form })

        const response = await this.$store.dispatch('auth/login', this.form)

        this.$notify(
          response,
          'Usuário criado com sucesso!',
          'positive'
        )

        this.form = {
          role: 'client',
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          phone: ''
        }
      } catch (error) {
        this.errors = error
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>
  div.row.signup-row {
    height: 100vh
  }
</style>
