/*
  Warnings:

  - Added the required column `zone` to the `ExamAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamAttempt" ADD COLUMN     "zone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "category" TEXT NOT NULL;
