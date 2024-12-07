/*
  Warnings:

  - A unique constraint covering the columns `[userId,examId]` on the table `ExamAttempt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExamAttempt_userId_examId_key" ON "ExamAttempt"("userId", "examId");
