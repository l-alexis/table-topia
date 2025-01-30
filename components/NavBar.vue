<template>
  <nav :key="isLoggedIn" class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand"><nuxt-link to="/">TableTopia</nuxt-link></a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item"><nuxt-link to="/">Accueil</nuxt-link></li>
          <li class="nav-item"><nuxt-link to="/games">Jeux</nuxt-link></li>
          <li v-if="!isLoggedIn" class="nav-item"><nuxt-link to="/account/login">Connexion</nuxt-link></li>
          <li v-if="!isLoggedIn" class="nav-item"><nuxt-link to="/account/register">Créer un compte</nuxt-link></li>
          <li v-if="isLoggedIn" class="nav-item" style="display: flex; align-items: center;">
            <span class="nav-link" style="color: #ecf0f1;">{{ username }}</span>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <button @click="logout" class="btn btn-primary nav-link" style="padding: 0.25rem 0.5rem; color: #ecf0f1;">Déconnexion</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      sessionStorage.clear();
      this.username = '';
      this.$router.push('/account/login').then(() => {
          window.location.reload();
        });
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      this.username = decoded.username;
    }
  },
};
</script>

<style scoped>
nav {
  margin-top: 20px;
}
nav a {
  color: #ecf0f1;
  margin: 0 15px;
  text-decoration: none;
  font-size: 1rem;
}
nav a:hover {
  color: #3498db;
}
</style>