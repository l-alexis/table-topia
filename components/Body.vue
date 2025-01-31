<template>
  <header class="body">
    <div class="overlay"></div>
    <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
      <div class="d-flex justify-content-center">
        <div class="text-center">
          <h1 class="mx-auto my-0 text-uppercase">TableTopia</h1>
          <h2 class="text-white-50 mx-auto mt-2 mb-5">
            TableTopia est une plateforme pour découvrir, partager et apprécier les jeux de société.
          </h2>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped>
.body {
  position: relative;
  height: 100vh;
  background: url('../assets/img/bg-masthead.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.body .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.body .container {
  z-index: 2;
}

.body h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  color: #fff;
}

.body h2 {
  font-size: 1.2rem;
  color: #dcdcdc;
  margin-bottom: 20px;
}

.body .btn {
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 30px;
}
</style>
