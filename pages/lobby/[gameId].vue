<template>
  <div class="lobby">
    <header class="body">
      <div class="container text-center">
        <h1>Lobby</h1>

        <transition name="fade" mode="out-in">
          <div v-if="isLoading" key="loading" class="loading-state">
            <p>Chargement...</p>
          </div>

          <div v-else-if="error" key="error" class="no-session">
            <p>{{ error }}</p>
          </div>

          <div v-else key="lobby-content" class="lobby-content">
            <h2>Joueurs en attente</h2>
            <ul class="player-list">
              <li v-for="player in players" :key="player.id" class="player-item">
                {{ player.username }}
              </li>
            </ul>

 
            <div v-if="lobbyCode" class="lobby-code">
              <p><strong>Code de la session : </strong>{{ lobbyCode }}</p>
              <button @click="copyLobbyCode" class="copy-button">
                Copier le code
              </button>
            </div>

            <button 
              @click="startGame" 
              :disabled="players.length < minPlayers"
              class="start-button"
            >
              Lancer la partie
            </button>
          </div>
        </transition>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userId = route.query.userId;

const players = ref([]);
const map = ref([]);
const gameSessionId = ref('');
const isLoading = ref(true);
const error = ref(null);
const minPlayers = 2;
const lobbyCode = ref('');

const copyLobbyCode = () => {
  if (lobbyCode.value) {
    navigator.clipboard.writeText(lobbyCode.value)
      .then(() => {
        alert("Code de session copié !");
      })
      .catch((err) => {
        alert("Erreur lors de la copie du code.");
      });
  }
};


const fetchLobby = async () => {
  try {
    const data = await $fetch(`/api/lobby/create?userId=${userId}`);
    gameSessionId.value = data.gameSessionId || '';
    players.value = data.users || [];
    lobbyCode.value = data.lobbyCode || '';
    map.value = data.map || [];
  } catch (err) {
    error.value = "Erreur lors de la récupération du lobby.";
  } finally {
    isLoading.value = false;
  }
};


const startGame = () => {
  if (players.value.length >= minPlayers) {
    router.push({ path: `/map/1`, query: { gameSessionId: Number(gameSessionId.value) } });
  }
};

onMounted(() => {
  fetchLobby();
});
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

.lobby-content {
  background-color: #34495e;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 80%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.player-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.player-item {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.start-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease;
}

.start-button:hover {
  background-color: #218838;
}

.start-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.loading-state,
.no-session {
  text-align: center;
  color: #fff;
  font-size: 1.5em;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.game-fade-enter-active,
.game-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.game-fade-enter,
.game-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.footer {
  background-color: #333;
  padding: 10px;
  color: #fff;
}

.lobby-code {
  background-color: #2c3e50;
  color: white;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  font-size: 1.2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.copy-button {
  background-color: #2980b9;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.copy-button:hover {
  background-color: #1f6e8c;
}
</style>
