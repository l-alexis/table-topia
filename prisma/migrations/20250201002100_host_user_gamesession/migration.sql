-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "hostId" INTEGER;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
