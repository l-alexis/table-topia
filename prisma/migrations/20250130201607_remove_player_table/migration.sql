/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_gameSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_fkey";

-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "_GameSessionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GameSessionToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GameSessionToUser_B_index" ON "_GameSessionToUser"("B");

-- AddForeignKey
ALTER TABLE "_GameSessionToUser" ADD CONSTRAINT "_GameSessionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameSessionToUser" ADD CONSTRAINT "_GameSessionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
