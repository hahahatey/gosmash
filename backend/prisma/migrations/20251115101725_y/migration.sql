/*
  Warnings:

  - The values [PRO_ARM] on the enum `TournamentCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TournamentCategory_new" AS ENUM ('MENS_SINGLES', 'MENS_DOUBLES', 'WOMENS_SINGLES', 'WOMENS_DOUBLES', 'MIXED_DOUBLES', 'PRO_AM');
ALTER TABLE "Tournament" ALTER COLUMN "category" TYPE "TournamentCategory_new" USING ("category"::text::"TournamentCategory_new");
ALTER TYPE "TournamentCategory" RENAME TO "TournamentCategory_old";
ALTER TYPE "TournamentCategory_new" RENAME TO "TournamentCategory";
DROP TYPE "public"."TournamentCategory_old";
COMMIT;
