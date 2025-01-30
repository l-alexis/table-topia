/*
  Warnings:

  - You are about to drop the column `players` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `gameSessionId` on the `Monster` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Monster` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Monster" DROP CONSTRAINT "Monster_gameSessionId_fkey";

-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "players";

-- AlterTable
ALTER TABLE "Monster" DROP COLUMN "gameSessionId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameSessionId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
