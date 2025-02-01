export const runtime = "server";

import { getPrismaClient } from "~/lib/prisma";

const findLobbyByUserAndCode = async (userId: string, lobbyCode: string) => {
  const prisma = getPrismaClient();
  const user = await prisma.user.findFirst({ where: { id: parseInt(userId as string) } });
  if (!user) {
    return null;
  }

  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() - 30);

  await prisma.gameSession.deleteMany({
    where: {
      createdAt: {
        lt: expirationTime,
      },
      status: 'waiting',
    },
  });

  const existingLobby = await prisma.gameSession.findFirst({
    where: {
      code: lobbyCode,
      status: 'waiting',
    },
    include: {
      User: true,
      host: true,
    },
  });

  if (existingLobby) {
    return { gameSession: { gameSessionId: existingLobby.id, status: existingLobby.status, lobbyCode: existingLobby.code, users: existingLobby.User, hostId: existingLobby.hostId } };
  }

  return null;
};

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const query = getQuery(event);

  try {
    const map = await prisma.map.findFirst().then((map) => ({
      connect: { id: map.id },
    }));

    const userId = query.userId;
    const lobbyCode = query.lobbyCode;

    if (!userId) {
      return { error: "ID de l'utilisateur non fourni." };
    }
    
    const user = await prisma.user.findFirst({ where: { id: parseInt(userId as string) } });

    if (!user) {
      return { error: "Utilisateur non trouvé." };
    }

    const existingLobby = await findLobbyByUserAndCode(userId, lobbyCode);
    if (existingLobby) {
      return existingLobby.gameSession;
    }

    let gameSession = await prisma.gameSession.create({
      data: {
        Map: map,
        User: {
          connect: { id: user.id },
        },
        host: {
          connect: { id: user.id },
        },
        code: Math.floor(1000 + Math.random() * 9000),
        status: 'waiting',
        rulesVersion: '1.0',
      },
    });

    return {
      gameSessionId: gameSession.id,
      status: gameSession.status,
      lobbyCode: gameSession.code,
      hostId: gameSession.hostId,
      users: [user]
    };
  } catch (error) {
    return { error: error.message };
  }
});