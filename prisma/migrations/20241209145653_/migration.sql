-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "examDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ExamAttempt" ALTER COLUMN "attemptDate" DROP DEFAULT;
