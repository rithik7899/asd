/*
  Warnings:

  - A unique constraint covering the columns `[questionId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Question_questionId_key" ON "Question"("questionId");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;
