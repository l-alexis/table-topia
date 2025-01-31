export const runtime = "nodejs";

import { getPrismaClient } from "~/lib/prisma";
import { getQuery, getRequestURL } from 'h3';

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const query = getQuery(event);
  const userId = query.userId;
  const lobbyCode = query.lobbyCode;

  if (!lobbyCode || !userId) {
    return { error: "ID du jeu ou ID de l'utilisateur non fourni.", lobbyCode: lobbyCode, userId: userId };
  }


  try {
    const gameSession = await prisma.gameSession.findFirst({
      where: {
        code: parseInt(lobbyCode as string),
        status: 'waiting',
      },
      include: {
        User: true,
      },
    });

    if (!gameSession) {
      return { error: "GameSession non trouvée." };
    }


    const user = await prisma.user.findFirst({ where: { id: parseInt(userId as string) } });

    if (!user) {
      return { error: "Utilisateur non trouvé." };
    }

    const playerCount = gameSession.User.length;
    if (playerCount < 4) {
      await prisma.gameSession.update({
        where: { id: gameSession.id },
        data: {
          User: {
            connect: { id: user.id },
          },
        },
      });
    } else {
      return { error: "La session est pleine. Maximum de 4 joueurs." };
    }

    return { message: "Utilisateur ajouté au lobby avec succès.", success: true };
  } catch (error) {
    return { error: "Impossible d'ajouter l'utilisateur au lobby." };
  }
});
