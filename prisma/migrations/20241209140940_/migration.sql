/*
  Warnings:

  - A unique constraint covering the columns `[examDate,shiftTime,name]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exam_examDate_shiftTime_name_key" ON "Exam"("examDate", "shiftTime", "name");
