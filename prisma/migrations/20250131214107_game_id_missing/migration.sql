/*
  Warnings:

  - You are about to drop the column `gameId` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Monster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "gameId";

-- AlterTable
ALTER TABLE "Monster" DROP COLUMN "gameId";
