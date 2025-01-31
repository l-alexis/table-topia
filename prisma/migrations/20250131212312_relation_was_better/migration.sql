/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_classId_fkey";

-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Monster" DROP CONSTRAINT "Monster_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Specialization" DROP CONSTRAINT "Specialization_classId_fkey";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "Game";

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "effect" JSONB NOT NULL,
    "rarity" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameSessionToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GameSessionToItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MapToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MapToMonster_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GameSessionToItem_B_index" ON "_GameSessionToItem"("B");

-- CreateIndex
CREATE INDEX "_MapToMonster_B_index" ON "_MapToMonster"("B");

-- AddForeignKey
ALTER TABLE "_GameSessionToItem" ADD CONSTRAINT "_GameSessionToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameSessionToItem" ADD CONSTRAINT "_GameSessionToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MapToMonster" ADD CONSTRAINT "_MapToMonster_A_fkey" FOREIGN KEY ("A") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MapToMonster" ADD CONSTRAINT "_MapToMonster_B_fkey" FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
