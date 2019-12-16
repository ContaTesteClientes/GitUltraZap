<template>
  <div class="login-row row full-width justify-center items-center bg-grey-4">
    <div class="col-xl-4 col-md-4 col-11">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Bem vindo</div>

          <div class="text-subtitle2">entre com dados de acesso</div>
        </q-card-section>

        <q-card-section>
          <w-input
            :disabled="loading"
            label="Email"
            v-model="form.email"
            name="email"
            :errors="errors"
          />

          <w-input
            :disabled="loading"
            label="Senha"
            type="password"
            v-model="form.password"
            name="password"
            :errors="errors"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions class="card-actions">
          <q-btn
            color="primary"
            @click="submit"
          >
            Acessar
          </q-btn>

          <q-btn
            color="positive"
            @click="$router.push({ name: 'auth-register' })"
          >
            Cadastrar
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import WInput from '../../components/common/WInput.vue'

export default {
  name: 'Login',

  components: {
    WInput
  },

  data () {
    return {
      loading: false,

      form: {
        email: '',

        password: ''
      },

      errors: []
    }
  },

  methods: {
    async submit () {
      this.loading = true

      try {
        await this.$store.dispatch('auth/login', this.form)

        this.$router.push('/dashboard')
      } catch (error) {
        this.errors = error
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>
  div.row.login-row {
    height: 100vh
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
  }
</style>
