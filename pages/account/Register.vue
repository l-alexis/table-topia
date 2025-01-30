<template>
  <div>
    <header class="body">
    <div class="overlay"></div>
    <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
      <div class="d-flex justify-content-center">
        <transition name="fade-up" mode="out-in">
          <div class="text-center" :key="$route.fullPath">
            <div class="text-center">
              <h1 class="mx-auto my-0 text-uppercase">Créer un compte</h1>
              <form @submit.prevent="register">
                <div class="mb-3">
                  <label for="username" class="form-label">Pseudo</label>
                  <input type="text" v-model="username" class="form-control input-short mx-auto" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" v-model="email" class="form-control input-short mx-auto" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input type="password" v-model="password" class="form-control input-short mx-auto" required>
                </div>
                <button type="submit" class="btn btn-primary">Créer un compte</button>
              </form>
              <p v-if="message" class="text-success mt-3">{{ message }}</p>
              <p v-if="message" class="text-success mt-3">Veuillez confirmer votre adresse e-mail pour activer votre compte.</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
    </header>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/api/account/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
      } catch (error) {
        console.error('Erreur lors de l inscription', error);
        this.message = 'Erreur lors de la création du compte.';
      }
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #333;
  color: white;
  padding: 50px 0;
}
.input-short {
  width: 300px;
}
</style>
