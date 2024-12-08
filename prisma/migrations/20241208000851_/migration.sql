/*
  Warnings:

  - Added the required column `positiveMarking` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "positiveMarking" DOUBLE PRECISION NOT NULL;
