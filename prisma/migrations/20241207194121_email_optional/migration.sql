/*
  Warnings:

  - Added the required column `negativeMarking` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "negativeMarking" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;
