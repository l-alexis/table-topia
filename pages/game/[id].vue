<template>
  <div>
    <header class="body">
      <div class="container text-center">
        <h1>{{ game.name }}</h1>
        <p>{{ game.description }}</p>
        <transition name="fade" mode="out-in">
          <div v-if="isLoading" key="loading" class="loading-state">
            <p>Chargement du jeu...</p>
          </div>
          <div v-else key="game-details" class="game-details-wrapper">
            <div class="game-details">
              <div class="game-mechanics">
                <h4>Mécaniques du jeu</h4>
                <p><strong>Lancer de dés :</strong> Chaque joueur lance un dé pour déterminer les déplacements possibles sur le plateau.</p>
                <p><strong>Événements :</strong> Les cases peuvent contenir des monstres, des butins, ou être sûres.</p>
              </div>

              <h3>Plateau de jeu</h3>
              <div class="board">
                <div class="board-grid">
                  <div 
                    v-for="cell in validCells" 
                    :key="cell.index"
                    class="cell"
                    :style="getCellPosition(cell.index)"
                    :class="{
                      player: cell.index === playerPosition,
                      available: availableMoves.includes(cell.index)
                    }"
                    @click="handleCellClick(cell.index)"
                  >
                    {{ cell.label }}
                  </div>
                </div>
              </div>

              <div class="dice-roll">
                <button @click="rollDice" class="btn-roll" :disabled="availableMoves.length > 0">Lancer les dés</button>
                <div v-if="diceResult !== null" class="dice-container">
                  <div class="dice" :class="{ 'rolling': isRolling }">
                    <div class="dice-face" :class="'dice-' + displayedDiceValue">
                      <div v-for="n in 9" :key="n" class="dot" :class="'dot-' + n"></div>
                    </div>
                  </div>
                </div>
                <p v-if="eventOutcome">{{ eventOutcome }}</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

const game = ref({ name: 'TableTopia', description: 'Un jeu de plateau immersif !' });
const isLoading = ref(false);
const diceResult = ref(null);
const eventOutcome = ref('');
const playerPosition = ref(0);
const availableMoves = ref([]);
const route = useRoute();
const gameSessionId = route.query.gameSessionId;
const gameSession = ref(null);
const currentMap = ref(null);
const config = ref(null);
const isRolling = ref(false);
const displayedDiceValue = ref(1);
let cellWidth = 80; 
let cellHeight = 80; 

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`/api/game-sessions/${gameSessionId}`);
    gameSession.value = await response.json();

    const mapId = 1;
    const mapResponse = await fetch(`/api/maps/${mapId}`);
    const mapData = await mapResponse.json();
    
    currentMap.value = mapData;
    config.value = mapData.map.config;

    if (gameSession.value.players.length > 0) {
      playerPosition.value = gameSession.value.players[0].position;
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
  updateCellDimensions(); 
  window.addEventListener('resize', updateCellDimensions); 
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCellDimensions);
});

const updateCellDimensions = () => {
  const cellElement = document.querySelector('.cell');
  if (cellElement) {
    const cellStyle = getComputedStyle(cellElement);
    cellWidth = parseInt(cellStyle.width);
    cellHeight = parseInt(cellStyle.height);
  }
};

const calculateAvailableMoves = (currentPosition, diceValue) => {
  const moves = new Set();
  if (!config.value) return Array.from(moves);

  let mapConfig;
  try {
    mapConfig = typeof config.value === 'string' ? JSON.parse(config.value) : config.value;
  } catch (error) {
    return Array.from(moves);
  }

  const explorePaths = (position, remainingMoves, visited = new Set()) => {
    if (remainingMoves === 0) {
      moves.add(position);
      return;
    }

    const adjacentCases = mapConfig[position.toString()];
    console.log('Position actuelle:', position, 'Mouvements restants:', remainingMoves);
    console.log('Cases adjacentes:', adjacentCases);

    if (!adjacentCases) return;

    for (const nextCase of adjacentCases) {
      if (!visited.has(nextCase) && nextCase !== 'inactive') {
        const newVisited = new Set(visited);
        newVisited.add(nextCase);
        explorePaths(nextCase, remainingMoves - 1, newVisited);
      }
    }
  };

  explorePaths(currentPosition, diceValue, new Set([currentPosition]));
  return Array.from(moves);
};

const rollDice = async () => {
  isRolling.value = true;
  displayedDiceValue.value = '...';
  
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const roll = new DiceRoll('1d6');
  
  for(let i = 0; i < 10; i++) {
    displayedDiceValue.value = Math.floor(Math.random() * 6) + 1;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  const result = roll.total;
  displayedDiceValue.value = result;
  diceResult.value = result;
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  isRolling.value = false;
  availableMoves.value = calculateAvailableMoves(playerPosition.value, result);
};

const handleCellClick = async (index) => {
  if (!availableMoves.value.includes(index)) {
    return;
  }
  
  try {
    const response = await fetch(`/api/game-sessions/${gameSessionId}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        position: index
      })
    });
    
    if (response.ok) {
      playerPosition.value = index;
      availableMoves.value = [];
      diceResult.value = null;
      eventOutcome.value = determineEvent(index);
    }
  } catch (error) {
  }
};

const determineEvent = (index) => {
  const cell = validCells.value[index];
  if (cell) {
    if (Math.random() < 0.5) {
      cell.event = 'Vous trouvez un butin !';
    }
    return cell;
  }
};

const validCells = computed(() => {
  if (!config.value) return [];
  
  return Object.keys(config.value)
    .map(key => {
      const index = parseInt(key);
      let cell = {
        index,
        label: `Case ${index}`,
        isActive: config.value[index.toString()] !== 'inactive'
      };

      if (index === 0) {
        cell.label = 'Départ';
        cell.event = 'Commencez votre aventure !';
      }

      if ([7, 26, 30, 46, 67, 60, 85].includes(index)) {
        cell.label = 'Butin';
        cell.event = 'Vous trouvez un butin !';
      }

      return cell;
    })
    .filter(cell => cell.isActive) 
    .sort((a, b) => a.index - b.index);
});

const getCellPosition = (index) => {
  const columns = 10; 
  const screenWidth = window.innerWidth;
  let x, y;
  if (screenWidth > 1920) {
    cellWidth = 100;
    cellHeight = 100;
  }
  x = (index % columns) * cellWidth + 1;
  y = Math.floor(index / columns) * cellHeight;

  return {
    left: `${x}px`,
    top: `${y}px`
  };
};
</script>

<style scoped>
.body {
  background-color: #333;
  color: white;
  padding: 50px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 120vh;
}

@media (max-width: 1920px) { 
  .board {
    width: 800px; 
    height: 720px; 
  }

  .cell {
    width: 80px; 
    height: 80px; 
  }
}

@media (min-width: 1921px) { 
  .board {
    width: 1000px; 
    height: 900px; 
  }

  .cell {
    width: 100px; 
    height: 100px; 
  }
}

.board {
  position: relative;
  margin: 20px auto;
  background-image: url('../../assets/img/New-map.jpg');
  background-size: cover;
  background-position: center;
}

.cell {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 100px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  background-color: rgba(46, 204, 113, 0.7);
  color: white;
}

.cell:hover {
  background-color: rgba(189, 195, 199, 0.7);
}

.cell.player {
  background-color: rgba(231, 76, 60, 0.7);
}

.cell.available {
  background-color: rgba(52, 152, 219, 0.7);
}

.dice-roll {
  margin-top: 20px;
}

.dice-roll button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dice-roll button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.dice-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.dice {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 8px;
}

.dice-face {
  position: relative;
  width: 100%;
  height: 100%;
}

.dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;
  display: none;
}

.dice-1 .dot-5 {
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dice-2 .dot-1,
.dice-2 .dot-9 {
  display: block;
}
.dice-2 .dot-1 { top: 20%; left: 20%; }
.dice-2 .dot-9 { bottom: 20%; right: 20%; }

.dice-3 .dot-1,
.dice-3 .dot-5,
.dice-3 .dot-9 {
  display: block;
}
.dice-3 .dot-1 { top: 20%; left: 20%; }
.dice-3 .dot-5 { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.dice-3 .dot-9 { bottom: 20%; right: 20%; }

.dice-4 .dot-1,
.dice-4 .dot-3,
.dice-4 .dot-7,
.dice-4 .dot-9 {
  display: block;
}
.dice-4 .dot-1 { top: 20%; left: 20%; }
.dice-4 .dot-3 { top: 20%; right: 20%; }
.dice-4 .dot-7 { bottom: 20%; left: 20%; }
.dice-4 .dot-9 { bottom: 20%; right: 20%; }

.dice-5 .dot-1,
.dice-5 .dot-3,
.dice-5 .dot-5,
.dice-5 .dot-7,
.dice-5 .dot-9 {
  display: block;
}
.dice-5 .dot-1 { top: 20%; left: 20%; }
.dice-5 .dot-3 { top: 20%; right: 20%; }
.dice-5 .dot-5 { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.dice-5 .dot-7 { bottom: 20%; left: 20%; }
.dice-5 .dot-9 { bottom: 20%; right: 20%; }

.dice-6 .dot-1,
.dice-6 .dot-3,
.dice-6 .dot-4,
.dice-6 .dot-6,
.dice-6 .dot-7,
.dice-6 .dot-9 {
  display: block;
}
.dice-6 .dot-1 { top: 20%; left: 20%; }
.dice-6 .dot-3 { top: 20%; right: 20%; }
.dice-6 .dot-4 { top: calc(50% - 10%); left: 20%; }
.dice-6 .dot-6 { top: calc(50% - 10%); right: 20%; }
.dice-6 .dot-7 { bottom: 20%; left: 20%; }
.dice-6 .dot-9 { bottom: 20%; right: 20%; }

.dice.rolling {
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
