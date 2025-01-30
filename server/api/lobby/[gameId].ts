export const runtime = "server";

import { getPrismaClient } from "~/lib/prisma";

/*export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const gameId = event.context.params?.gameId;

  if (!gameId) {
    return { error: "ID du jeu non fourni." };
  }

  try {
    // Vérifier si une session de jeu existe déjà
    let gameSession = await prisma.gameSession.findFirst({
      where: { gameId: parseInt(gameId) },
      include: {
        Player: {
          include: { User: true }, // Récupérer les infos des joueurs
        },
        Game: true,
        Map: true,
      },
    });

    // Si aucune session trouvée, en créer une
    if (!gameSession) {
      gameSession = await prisma.gameSession.create({
        data: {
            Game: {
                connect: { id: Number(gameId) }, // 🔥 On connecte un jeu existant
              },
          status: "waiting",
          rulesVersion: "1.0",
          code: Math.floor(1000 + Math.random() * 9000), // Génère un code de lobby à 4 chiffres
          Map: {
            create: {
              name: "Carte par défaut",
              config: {},
              background: "/images/default-map.jpg",
            },
          },
        },
        include: {
          Player: {
            include: { User: true },
          },
          Game: true,
          Map: true,
        },
      });
    }

    // Extraire les joueurs
    const players = gameSession.Player.map((player) => ({
      id: player.User.id,
      username: player.User.username,
    }));

    return {
      gameSessionId: gameSession.id,
      game: gameSession.Game,
      players,
      map: gameSession.Map,
      status: gameSession.status,
      lobbyCode: gameSession.code,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du lobby:", error);
    return { error: "Impossible de récupérer le lobby." };
  }
});
*/

// FAKE DATA
export default defineEventHandler(async (event) => {
  const gameId = event.context.params?.gameId;

  if (!gameId) {
    return { error: "ID du jeu non fourni." };
  }

  try {
    const gameSession = {
      id: 1,
      Game: {
        name: "Super Jeu",
        id: parseInt(gameId),
        minPlayers: 2,
      },
      status: "waiting",
      code: Math.floor(1000 + Math.random() * 9000),
      Map: {
        id: 1,
        name: "Carte par défaut",
        background: "/images/default-map.jpg",
        config: {"1":[2],"2":[1,3],"3":[2,4],"4":[3,5],"5":[4,6],"6":[5,7],"7":[6,8],"8":[7,9],"9":[8,10],"10":[9,20],"20":[10,30],"21":[22,31],"22":[23,21],"23":[24,22],"24":[25,23],"25":[26,24],"26":[27,25],"27":[28,26],"28":[29,27],"29":[30,28],"30":[20,29],"31":[21,41],"41":[31,42],"42":[41,43],"43":[42,44],"44":[43,45],"45":[44,46],"46":[45,47],"47":[46,48],"48":[47,49],"49":[48,50],"50":[49,60],"60":[50,70],"61":[62,71],"62":[63,61],"63":[64,62],"64":[65,63],"65":[66,64],"66":[67,65],"67":[68,66],"68":[69,67],"69":[70,68],"70":[60,69],"71":[61,81],"81":[71,82],"82":[81,83],"83":[82,84],"84":[83,85],"85":[84,86],"86":[85,87],"87":[86,88],"88":[87,89],"89":[88,90],"90":[89]}
      },
      Player: [
        { User: { id: 1, username: "Ncrz" } },
        { User: { id: 2, username: "Chauke." } },
      ],
    };

    const players = gameSession.Player.map((player) => ({
      id: player.User.id,
      username: player.User.username,
    }));

    return {
      gameSessionId: gameSession.id,
      game: gameSession.Game,
      players,
      map: gameSession.Map,
      status: gameSession.status,
      lobbyCode: gameSession.code,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du lobby:", error);
    return { error: "Impossible de récupérer le lobby." };
  }
});