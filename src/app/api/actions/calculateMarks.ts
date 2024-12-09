import prisma from "../../../../prisma/src";
import { Question } from "../rank/route";

export const calculateMarks = (questions: Question[], positiveMarking: number, negativeMarking: number): number => {
  return questions.reduce((total, question) => {
    const chosenOption = question.chosenAnswer !== '--' ? question.chosenAnswer : null;
    const isCorrect = chosenOption === question.correctAnswer.charAt(0);

    if (isCorrect) {
      total += positiveMarking;
    } else if (chosenOption) {
      total -= negativeMarking;
    }

    return total;
  }, 0);
};

export async function getAverageMarks(examId: string, category: string, shiftTime: string) {

  const overallAverageMarks = await prisma.examAttempt.aggregate({
    where: {
      examId
    },
    _avg: {
      totalMarks: true
    },
  });

  const categoryAverageMarks = await prisma.examAttempt.aggregate({
    where: {
      examId,
      category
    },
    _avg: {
      totalMarks: true,
    }
  });

  const shiftAverageMarks = await prisma.examAttempt.aggregate({
    where: {
      examId,
      shiftTime,
    },
    _avg: {
      totalMarks: true,
    },
  });

  return {
    overallAverageMarks,
    categoryAverageMarks,
    shiftAverageMarks
  }
}