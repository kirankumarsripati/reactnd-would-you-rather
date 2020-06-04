export interface Question {
  id: string,
  timestamp: Date,
  author: string,
  optionOne: QuestionOption,
  optionTwo: QuestionOption,
}

export interface QuestionOption {
  votes: string[],
  text: string,
}

export interface QuestionById {
  [key: string]: Question
}

export type AnswerOption = 'optionOne' | 'optionTwo';