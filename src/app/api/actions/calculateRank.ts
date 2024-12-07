import prisma from '../../../../prisma/src';

export const getRankForUser = async (examId: string, userId: string) => {

  const userMarks = await prisma.examAttempt.findUnique({
    where: { userId_examId: { userId, examId } },
  });

  if (!userMarks) {
    throw new Error('User exam attempt not found');
  }

  const { totalMarks, zone, category } = userMarks;

  const overallRank = await getOverallRank(examId, totalMarks);

  const zoneRank = await getZoneRank(examId, zone, totalMarks);

  const categoryRank = await getCategoryRank(examId, category, totalMarks);

  return {
    overallRank,
    zoneRank,
    categoryRank,
  };
};

const getOverallRank = async (examId: string, userMarks: number) => {
  const rank = await prisma.examAttempt.count({
    where: {
      examId,
      totalMarks: { gt: userMarks },
    },
  });

  return rank + 1;
};

const getZoneRank = async (examId: string, zone: string, userMarks: number) => {
  const rank = await prisma.examAttempt.count({
    where: {
      examId,
      zone,
      totalMarks: { gt: userMarks },
    },
  });

  return rank + 1;
};

const getCategoryRank = async (examId: string, category: string, userMarks: number) => {
  const rank = await prisma.examAttempt.count({
    where: {
      examId,
      category,
      totalMarks: { gt: userMarks },
    },
  });

  return rank + 1;
};
