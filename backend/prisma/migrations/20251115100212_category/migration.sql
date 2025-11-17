/*
  Warnings:

  - Added the required column `category` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TournamentCategory" AS ENUM ('MENS_SINGLES', 'MENS_DOUBLES', 'WOMENS_SINGLES', 'WOMENS_DOUBLES', 'MIXED_DOUBLES', 'PRO_ARM');

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "category" "TournamentCategory" NOT NULL;
