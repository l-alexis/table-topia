<template>
  <div>
    <Navbar />
    <!-- Transition between pages -->

    <transition name="page-fade" mode="out-in">
      <div class="page-container">
        <NuxtPage /> <!-- NuxtPage wrapped with a container element -->
      </div>
    </transition>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'; 
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.body {
  background-color: #34495e;
  color: white;
  padding: 50px 0;
}

.body h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.body p {
  font-size: 1.2rem;
}

footer {
  background-color: #34495e;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.page-fade-enter, .page-fade-leave-to {
  opacity: 0;
}
</style>
