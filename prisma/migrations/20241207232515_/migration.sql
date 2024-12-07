/*
  Warnings:

  - Added the required column `category` to the `ExamAttempt` table without a default value. This is not possible if the table is not empty.
  - Made the column `totalMarks` on table `ExamAttempt` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ExamAttempt" ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "totalMarks" SET NOT NULL;
