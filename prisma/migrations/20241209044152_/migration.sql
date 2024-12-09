/*
  Warnings:

  - Added the required column `language` to the `ExamAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamAttempt" ADD COLUMN     "language" TEXT NOT NULL;
