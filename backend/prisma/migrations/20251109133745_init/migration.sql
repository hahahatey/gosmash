/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `TournamentTemplate` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fee` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `TournamentTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Tournament" DROP CONSTRAINT "Tournament_categoryId_fkey";

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "categoryId",
ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "TournamentTemplate" DROP COLUMN "fee",
ADD COLUMN     "organizerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Category";

-- AddForeignKey
ALTER TABLE "TournamentTemplate" ADD CONSTRAINT "TournamentTemplate_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
