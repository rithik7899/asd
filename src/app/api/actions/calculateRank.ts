import prisma from '../../../../prisma/src';

export const getRankForUser = async (examId: string, userId: string) => {
  const userMarks = await prisma.examAttempt.findUnique({
    where: { userId_examId: { userId, examId } },
  });

  if (!userMarks) {
    throw new Error('User exam attempt not found');
  }

  const { totalMarks, shiftTime, category } = userMarks;

  const overallRank = await getOverallRank(examId, totalMarks);
  const shiftRank = await getShiftRank(examId, shiftTime, totalMarks);
  const categoryRank = await getCategoryRank(examId, category, totalMarks);

  const overallCandidates = await prisma.examAttempt.count({
    where: {
      examId
    },
  });

  const categoryCandidates = await prisma.examAttempt.count({
    where: {
      examId,
      category
    },
  });

  const shiftCandidates = await prisma.examAttempt.count({
    where: {
      examId,
      shiftTime
    }
  })

  return {
    overallRank: `${overallRank.rank}/${overallCandidates}`,
    shiftRank: `${shiftRank.rank}/${shiftCandidates}`,
    categoryRank: `${categoryRank.rank}/${categoryCandidates}`,
  };
};

const getOverallRank = async (examId: string, userMarks: number) => {
  const scores = await prisma.examAttempt.findMany({
    where: { examId },
    select: { userId: true, totalMarks: true },
  });

  const sortedScores = scores.sort((a, b) => b.totalMarks - a.totalMarks);

  let rank = 1;
  let currentRank = 1;
  for (let i = 0; i < sortedScores.length; i++) {
    if (i > 0 && sortedScores[i].totalMarks < sortedScores[i - 1].totalMarks) {
      currentRank = i + 1;
    }
    if (sortedScores[i].totalMarks === userMarks) {
      rank = currentRank;
      break;
    }
  }

  return { rank };
};

const getShiftRank = async (examId: string, shiftTime: string, userMarks: number) => {
  const scores = await prisma.examAttempt.findMany({
    where: { examId, shiftTime },
    select: { userId: true, totalMarks: true },
  });

  const sortedScores = scores.sort((a, b) => b.totalMarks - a.totalMarks);

  let rank = 1;
  let currentRank = 1;
  for (let i = 0; i < sortedScores.length; i++) {
    if (i > 0 && sortedScores[i].totalMarks < sortedScores[i - 1].totalMarks) {
      currentRank = i + 1;
    }
    if (sortedScores[i].totalMarks === userMarks) {
      rank = currentRank;
      break;
    }
  }

  return { rank };
};

const getCategoryRank = async (examId: string, category: string, userMarks: number) => {
  const scores = await prisma.examAttempt.findMany({
    where: { examId, category },
    select: { userId: true, totalMarks: true },
  });

  const sortedScores = scores.sort((a, b) => b.totalMarks - a.totalMarks);

  let rank = 1;
  let currentRank = 1;
  for (let i = 0; i < sortedScores.length; i++) {
    if (i > 0 && sortedScores[i].totalMarks < sortedScores[i - 1].totalMarks) {
      currentRank = i + 1;
    }
    if (sortedScores[i].totalMarks === userMarks) {
      rank = currentRank;
      break;
    }
  }


  return { rank };
};
