-- CreateTable
CREATE TABLE "Rank" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "zoneRank" INTEGER NOT NULL,
    "categoryRank" INTEGER NOT NULL,
    "overallRank" INTEGER NOT NULL,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rank_userId_examId_key" ON "Rank"("userId", "examId");

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
