import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedExamAttempts = async () => {
    const examAttempts = [
        {
            examId: 'sdasdasd',  // Replace with actual exam IDs
            rollNumber: '1233445',
            language: 'English',
            category: 'st', // Example category
            shiftTime: '12:30 PM - 1:30 PM', // Example shift time
            attemptDate: '2024-12-10', // Example date
            totalMarks: 85.5,
        },
        {
            examId: 'sdasdasd',
            rollNumber: '6785590',
            language: 'Hindi',
            category: 'sc',
            shiftTime: '12:30 PM - 1:30 PM',
            attemptDate: '2024-12-10',
            totalMarks: 90.0,
        },
    ];

    for (const attempt of examAttempts) {
        await prisma.examAttempt.create({
            data: {
                examId: attempt.examId,
                rollNumber: attempt.rollNumber,
                language: attempt.language,
                category: attempt.category,
                shiftTime: attempt.shiftTime,
                attemptDate: attempt.attemptDate,
                totalMarks: attempt.totalMarks,
            },
        });
    }

    console.log('Exam attempts seeded successfully!');
};

seedExamAttempts()
    .catch((error) => {
        console.error('Error seeding exam attempts:', error);
    })
    .finally(() => {
        prisma.$disconnect();
    });