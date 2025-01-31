<template>
  <div>
    <header class="body">
      <div class="container text-center">
        <transition name="fade-up" mode="out-in">
          <h1 :key="$route.fullPath">TABLETOPIA</h1>
        </transition>
        <transition name="fade-up" mode="out-in">
          <p :key="$route.fullPath">Créez ou rejoignez une aventure épique !</p>
        </transition>
        <div class="game-options">
          <button class="start-button" @click="createLobby">Créer un lobby</button>
          <div class="join-lobby">
            <h2 class="text-center">Rejoindre un lobby</h2>
            <input v-model="lobbyCode" placeholder="Entrez le code du lobby" />
            <button class="start-button" @click="joinLobby">Rejoindre</button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const lobbyCode = ref('');
const userId = ref('');

const token = localStorage.getItem('token');
if (token) {
  const decoded = JSON.parse(atob(token.split('.')[1]));
  userId.value = decoded.id;
}
 
const createLobby = () => {
  router.push(`/lobby/create?userId=${userId.value}`);
};

const joinLobby = () => {
  router.push(`/lobby/join?lobbyCode=${lobbyCode.value}`);
};
</script>

<style scoped>
.body {
  background-color: #333;
  color: white;
  padding: 50px 0;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  margin-bottom: 0;
}

.game-options {
  text-align: center;
}

.join-lobby {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
}

.start-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.start-button + .start-button {
  margin-top: 30px;
}

.start-button:hover {
  background-color: #218838;
}

.fade-up-enter-active, .fade-up-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.fade-up-enter, .fade-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>