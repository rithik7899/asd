import { Question } from "../scrape/route";

export const calculateMarks = (questions: Question[], negativeMarking: number): number => {
    return questions.reduce((total, question) => {
      const chosenOption = question.chosenAnswer !== '--' ? question.chosenAnswer : null;
      const isCorrect = chosenOption === question.correctAnswer.charAt(0);
  
      if (isCorrect) {
        total += 4;  // Correct answer
      } else if (chosenOption) {
        total -= negativeMarking;  // Incorrect answer (Negative marking)
      }
  
      return total;
    }, 0);
  };
  