<template>
  <div>
    <header class="body">
    <div class="overlay"></div>
    <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
      <div class="d-flex justify-content-center">
        <transition name="fade-up" mode="out-in">
          <div class="text-center" :key="$route.fullPath">
            <div class="text-center">
              <h1 class="mx-auto my-0 text-uppercase">TableTopia</h1>
              <h2 class="text-white-50 mx-auto mt-2 mb-5">
                TableTopia est une plateforme pour découvrir, partager et apprécier les jeux de société.
              </h2>
              <nuxt-link class="btn btn-primary btn-lg" to="/games">Découvrir les jeux</nuxt-link>
            </div>
            <slot />
          </div>
        </transition>
      </div>
    </div>
    </header>

   <transition name="fade-up" mode="out-in">
      <section class="about-section text-center" id="about">
      <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
      
    
      </div>
      </section>
    </transition>
  </div>
</template>

<script setup>
</script>

<style scoped>
.body {
  background-color: #333;
  color: white;
  padding: 50px 0;
}

.about-section {
  background-color: #f0f0f0;
  padding: 50px 0;
}

.fade-up-enter-active, .fade-up-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.fade-up-enter, .fade-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>