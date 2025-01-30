 <template> 
   <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand"><nuxt-link to="/">TableTopia</nuxt-link></a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><nuxt-link to="/">Accueil</nuxt-link></li>
            <li class="nav-item"><nuxt-link to="/games">Jeux</nuxt-link></li>
          </ul>
        </div>
      </div>
    </nav>
</template>

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
</style scoped>