import { GameSession } from '~/types/game';

export default defineEventHandler(async (event): Promise<GameSession> => {
  const id = event.context.params?.id;
  
  // TODO: Remplacer par une vraie requête à la base de données
  const gameSession: GameSession = {
    id: id || '',
    mapId: 'map1',
    players: [
      {
        id: '1',
        name: 'Joueur 1',
        position: 0
      }
    ],
    currentPlayerIndex: 0,
    status: 'playing'
  };

  return gameSession;
});
