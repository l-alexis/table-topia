/*
  Warnings:

  - A unique constraint covering the columns `[mapId]` on the table `GameSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "background" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_mapId_key" ON "GameSession"("mapId");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
