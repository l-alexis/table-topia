<template>
  <div>
    <header class="body">
    <div class="overlay"></div>
    <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
      <div class="d-flex justify-content-center">
        <transition name="fade-up" mode="out-in">
          <div class="text-center" :key="$route.fullPath">
            <div class="text-center">
              <h1 class="mx-auto my-0 text-uppercase">Connexion</h1>
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" v-model="email" class="form-control input-short mx-auto" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input type="password" v-model="password" class="form-control input-short mx-auto" required>
                </div>
                <button type="submit" class="btn btn-primary">Se connecter</button>
              </form>
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
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      console.log('Tentative de connexion');
      try {
        const response = await axios.post('/api/account/login', {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.$router.push('/').then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Erreur lors de la connexion', error);
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
