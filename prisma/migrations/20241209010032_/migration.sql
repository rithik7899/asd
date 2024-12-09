/*
  Warnings:

  - You are about to drop the column `zone` on the `ExamAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `zoneRank` on the `Rank` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExamAttempt" DROP COLUMN "zone";

-- AlterTable
ALTER TABLE "Rank" DROP COLUMN "zoneRank";
