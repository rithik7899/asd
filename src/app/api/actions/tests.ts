// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const seedExamAttempts = async () => {
//     const examAttempts = [
//         {
//             examId: 'sdasdasd',  // Replace with actual exam IDs
//             rollNumber: '123445',
//             language: 'English',
//             category: 'OBC', // Example category
//             shiftTime: '12:30 PM - 1:30 PM', // Example shift time
//             attemptDate: '2024-12-10', // Example date
//             totalMarks: 85.5,
//         },
//         {
//             examId: 'sdasdasd',
//             rollNumber: '67890',
//             language: 'Hindi',
//             category: 'UR',
//             shiftTime: '12:30 PM - 1:30 PM',
//             attemptDate: '2024-12-10',
//             totalMarks: 90.0,
//         },
//     ];

//     for (const attempt of examAttempts) {
//         await prisma.examAttempt.create({
//             data: {
//                 examId: attempt.examId,
//                 rollNumber: attempt.rollNumber,
//                 language: attempt.language,
//                 category: attempt.category,
//                 shiftTime: attempt.shiftTime,
//                 attemptDate: attempt.attemptDate,
//                 totalMarks: attempt.totalMarks,
//             },
//         });
//     }

//     console.log('Exam attempts seeded successfully!');
// };

// seedExamAttempts()
//     .catch((error) => {
//         console.error('Error seeding exam attempts:', error);
//     })
//     .finally(() => {
//         prisma.$disconnect();
//     });




import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getMarksAboveInfo() {
  const marksAboveData = {};

  const ranges = [
    { range: '70', filter: { totalMarks: { gt: 70 } } },
    { range: '65', filter: { totalMarks: { gt: 65 } } },
    { range: '60', filter: { totalMarks: { gt: 60 } } },
    { range: '55', filter: { totalMarks: { gt: 55 } } },
    { range: '50', filter: { totalMarks: { gt: 50 } } },
    { range: '45', filter: { totalMarks: { gt: 45 } } },
    { range: '40', filter: { totalMarks: { gt: 40 } } },
    { range: '35', filter: { totalMarks: { gt: 35 } } },
    { range: '30', filter: { totalMarks: { gt: 30 } } },
    { range: '20', filter: { totalMarks: { gt: 20 } } },
  ];

  for (const { range, filter } of ranges) {
    const data = await prisma.examAttempt.findMany({
      where: filter,
      select: {
        category: true,
      },
    });

    const categoryCount = data.reduce((acc, { category }) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    marksAboveData[`marksAbove${range}`] = categoryCount;
  }

  return marksAboveData;
}

async function main() {
  const data = await getMarksAboveInfo();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
