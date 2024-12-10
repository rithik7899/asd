import redis from '../../../lib/redis';
import  prisma  from '../../../../prisma/src';

const TTL = 10; // will change this

export const getRankForUser = async (examId: string, rollNumber: string) => {
  const userMarks = await prisma.examAttempt.findUnique({
    where: {  examId, rollNumber },
    select: { totalMarks: true, shiftTime: true, category: true },
  });

  if (!userMarks) {
    throw new Error('User exam attempt not found');
  }

  const { totalMarks, shiftTime, category } = userMarks;

  const overallKey = `exam:${examId}:overall`;
  const categoryKey = `exam:${examId}:category:${category}`;
  const shiftKey = `exam:${examId}:shift:${shiftTime}`;

  const existingOverallRanks = await redis.zcard(overallKey);

  if (existingOverallRanks === 0) {
    const allAttempts = await prisma.examAttempt.findMany({
      where: { examId },
      select: { 
        rollNumber: true, 
        totalMarks: true, 
        shiftTime: true, 
        category: true 
      }
    });

    const overallTransaction = redis.multi();
    const categoryTransactions: Record<string, ReturnType<typeof redis.multi>> = {};
    const shiftTransactions: Record<string, ReturnType<typeof redis.multi>> = {};

    allAttempts.forEach(attempt => {
      overallTransaction.zadd(overallKey, attempt.totalMarks, attempt.rollNumber);

      const categoryKey = `exam:${examId}:category:${attempt.category}`;
      if (!categoryTransactions[categoryKey]) {
        categoryTransactions[categoryKey] = redis.multi();
      }
      categoryTransactions[categoryKey].zadd(categoryKey, attempt.totalMarks, attempt.rollNumber);

      const shiftKey = `exam:${examId}:shift:${attempt.shiftTime}`;
      if (!shiftTransactions[shiftKey]) {
        shiftTransactions[shiftKey] = redis.multi();
      }
      shiftTransactions[shiftKey].zadd(shiftKey, attempt.totalMarks, attempt.rollNumber);
    });

    await overallTransaction.exec();
    await Promise.all([
      ...Object.values(categoryTransactions).map(t => t.exec()),
      ...Object.values(shiftTransactions).map(t => t.exec())
    ]);

    await redis.expire(overallKey, TTL);
    Object.keys(categoryTransactions).forEach(key => redis.expire(key, TTL));
    Object.keys(shiftTransactions).forEach(key => redis.expire(key, TTL));
  }

  await redis.zadd(overallKey, totalMarks, rollNumber);
  await redis.zadd(categoryKey, totalMarks, rollNumber);
  await redis.zadd(shiftKey, totalMarks, rollNumber);

  const overallRankRedis = await redis.zrevrank(overallKey, rollNumber);
  const categoryRankRedis = await redis.zrevrank(categoryKey, rollNumber);
  const shiftRankRedis = await redis.zrevrank(shiftKey, rollNumber);

  const overallCandidates = await redis.zcard(overallKey);
  const categoryCandidates = await redis.zcard(categoryKey);
  const shiftCandidates = await redis.zcard(shiftKey);

  return {
    overallRank: `${overallRankRedis !== null ? overallRankRedis + 1 : 0}/${overallCandidates}`,
    categoryRank: `${categoryRankRedis !== null ? categoryRankRedis + 1 : 0}/${categoryCandidates}`,
    shiftRank: `${shiftRankRedis !== null ? shiftRankRedis + 1 : 0}/${shiftCandidates}`,
  };
};

async function main() {
  const a = await getRankForUser("sdasdasd", "281241170410494");
  console.log(a);
}
main()
