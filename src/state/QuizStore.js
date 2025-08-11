import { create } from 'zustand';

const useQuizStore = create((set) => ({
  // Quiz parameters
  quizParams: {
    type: 'MATHS',
    numberOfQuestions: 10,
    level: 'EASY'
  },
  setQuizParams: (params) => set({ quizParams: params }),

  // Quiz data and state
  quizData: [],
  setQuizData: (data) => set({ quizData: data }),

  // Quiz progress
  currentQuestionIndex: 0,
  score: 0,
  selectedOption: null,
  isAnswered: false,

  // Actions
  resetQuiz: () => set({ 
    currentQuestionIndex: 0,
    score: 0,
    selectedOption: null,
    isAnswered: false
  }),
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1,
    selectedOption: null,
    isAnswered: false
  })),
  selectOption: (optionIndex) => set((state) => {
    const currentQuestion = state.quizData[state.currentQuestionIndex];
    const isCorrect = currentQuestion.options[optionIndex] === currentQuestion.answer;
    
    return {
      selectedOption: optionIndex,
      isAnswered: true,
      score: isCorrect ? state.score + 1 : state.score
    };
  })
}));

export default useQuizStore;