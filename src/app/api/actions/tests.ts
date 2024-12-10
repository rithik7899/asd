// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function getMarksAboveInfo() {
//   const marksAboveData = {};

//   const ranges = [
//     { range: '70', filter: { totalMarks: { gt: 70 } } },
//     { range: '65', filter: { totalMarks: { gt: 65 } } },
//     { range: '60', filter: { totalMarks: { gt: 60 } } },
//     { range: '55', filter: { totalMarks: { gt: 55 } } },
//     { range: '50', filter: { totalMarks: { gt: 50 } } },
//     { range: '45', filter: { totalMarks: { gt: 45 } } },
//     { range: '40', filter: { totalMarks: { gt: 40 } } },
//     { range: '35', filter: { totalMarks: { gt: 35 } } },
//     { range: '30', filter: { totalMarks: { gt: 30 } } },
//     { range: '20', filter: { totalMarks: { gt: 20 } } },
//   ];

//   for (const { range, filter } of ranges) {
//     const data = await prisma.examAttempt.findMany({
//       where: filter,
//       select: {
//         category: true,
//       },
//     });

//     const categoryCount = data.reduce((acc, { category }) => {
//       acc[category] = (acc[category] || 0) + 1;
//       return acc;
//     }, {});

//     marksAboveData[`marksAbove${range}`] = categoryCount;
//   }

//   return marksAboveData;
// }

// async function main() {
//   const data = await getMarksAboveInfo();
//   console.log(JSON.stringify(data, null, 2));
// }

// main().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });