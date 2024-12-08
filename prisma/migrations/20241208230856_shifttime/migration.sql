/*
  Warnings:

  - A unique constraint covering the columns `[shiftTime]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shiftTime` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftTime` to the `ExamAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Exam_name_key";

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "shiftTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExamAttempt" ADD COLUMN     "shiftTime" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exam_shiftTime_key" ON "Exam"("shiftTime");
