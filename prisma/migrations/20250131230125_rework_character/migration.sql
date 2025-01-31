/*
  Warnings:

  - You are about to drop the column `classId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `gameSessionId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Specialization` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_gameSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_specializationId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "classId",
DROP COLUMN "gameSessionId",
DROP COLUMN "ownerId",
ALTER COLUMN "specializationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Specialization" DROP COLUMN "classId";

-- CreateTable
CREATE TABLE "UserCharacter" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameSessionId" INTEGER,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "UserCharacter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCharacter" ADD CONSTRAINT "UserCharacter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCharacter" ADD CONSTRAINT "UserCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCharacter" ADD CONSTRAINT "UserCharacter_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
