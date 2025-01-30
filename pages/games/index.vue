<template>
  <div>
    <header class="body">
      <div class="container text-center">
        <h1>Tous les jeux</h1>
        <p>Explorer notre collection de jeux et trouver votre prochaine aventure !</p>
        <transition name="fade" mode="out-in">
          <div v-if="isLoading" key="loading" class="loading-state">
            <p>Chargement des jeux ...</p>
          </div>
          <div v-else-if="games.length" key="game-list" class="game-list-wrapper">
            <transition-group name="game-fade" tag="div" class="game-list">
              <div
                class="game-item"
                v-for="game in games"
                :key="game.id"
                @click="goToLobby(game.id)"
              >
                <h2>{{ game.name }}</h2>
                <p>{{ game.description }}</p>
                <div class="game-details">
                  <p><strong>Players:</strong> {{ game.minPlayers }} - {{ game.maxPlayers }}</p>
                  <p><strong>Avg. Playtime:</strong> {{ game.avgPlayTime }} minutes</p>
                  <p><strong>Complexity:</strong> {{ game.complexity }}</p>
                </div>
              </div>
            </transition-group>
          </div>
          <div v-else key="no-games" class="no-games">
            <p v-if="error">Error fetching games: {{ error }}</p>
            <p v-else>No games available.</p>
          </div>
        </transition>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const games = ref([]);
const error = ref(null);
const isLoading = ref(true);

const fetchGames = async () => {
  try {
    const data = await $fetch('/api/gamesLib');
    games.value = data?.games || [];
  } catch (err) {
    error.value = 'Failed to fetch games';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchGames();
});

const goToLobby = (gameId) => {
  router.push(`/lobby/${gameId}`);
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

.games-section {
  padding: 50px 0;
  background-color: #f0f0f0;
}

.game-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.game-item {
  background-color: #34495e;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 300px;
  text-align: center;
  transition: transform 0.2s ease;
}

.game-item:hover {
  transform: scale(1.05);
}

.game-details {
  margin-top: 10px;
  font-size: 0.9em;
  color: #bdc3c7;
}

.game-details p {
  margin: 5px 0;
}

.loading-state,
.no-games {
  text-align: center;
  color: #fff;
  font-size: 1.5em;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
}

.fade-enter-active,
.fade-leave-active,
.game-fade-enter-active,
.game-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter,
.fade-leave-to,
.game-fade-enter,
.game-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.footer {
  background-color: #333;
  padding: 10px;
  color: #fff;
}
</style>