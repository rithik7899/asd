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
  // const zoneRank = await getZoneRank(examId, zone, totalMarks);
  const categoryRank = await getCategoryRank(examId, category, totalMarks);

  const overallCandidates =  await prisma.examAttempt.count({
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
  // console.log({
  //   rank:'----------------------------------',
  //   overallRank: `${overallRank.rank}/${overallCandidates}`,
  //   zoneRank: `${zoneRank.rank}/${totalCandidates}`,
  //   categoryRank: `${categoryRank.rank}/${totalCandidates}`
  // });
  

  return {
    overallRank: `${overallRank.rank}/${overallCandidates}`,
    // zoneRank: `${zoneRank.rank}/${categoryCandidates}`,
    categoryRank: `${categoryRank.rank}/${categoryCandidates}`,
  };
};

const getOverallRank = async (examId: string, userMarks: number) => {
  const scores = await prisma.examAttempt.findMany({
    where: { examId },
    select: { userId: true, totalMarks: true },
  });

  // Sort the candidates by marks in descending order
  const sortedScores = scores.sort((a, b) => b.totalMarks - a.totalMarks);

  // Find the rank of the user based on their marks
  let rank = 1;
  let currentRank = 1;
  for (let i = 0; i < sortedScores.length; i++) {
    if (i > 0 && sortedScores[i].totalMarks < sortedScores[i - 1].totalMarks) {
      currentRank = i + 1;  // Increment rank when a different score is encountered
    }
    if (sortedScores[i].totalMarks === userMarks) {
      rank = currentRank;
      break;
    }
  }

  return { rank };
};

const getZoneRank = async (examId: string, zone: string, userMarks: number) => {
  const scores = await prisma.examAttempt.findMany({
    where: { examId, zone },
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
