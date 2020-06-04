import { showLoading, hideLoading } from 'react-redux-loading';

import { _saveQuestion } from '../utils/_DATA';
import { Question, QuestionById, AnswerOption } from '../models/question';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_ANSWER = 'SAVE_ANSWER';

interface GetQuestionsAction {
  type: typeof GET_QUESTIONS,
  questions: QuestionById,
}

interface AddQuestionAction {
  type: typeof ADD_QUESTION,
  question: Question,
}

interface SaveAnswerAction {
  type: typeof SAVE_ANSWER,
  authedUser: string,
  questionId: string,
  answer: AnswerOption,
}

export type QuestionsActionTypes = GetQuestionsAction
 | AddQuestionAction
 | SaveAnswerAction;

export function getQuestions(questions: QuestionById): QuestionsActionTypes {
  return {
    type: GET_QUESTIONS,
    questions,
  }
}

export function addQuestion(question: Question): QuestionsActionTypes {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function saveAnswer(
  authedUser: string,
  questionId: string,
  answer: AnswerOption
): QuestionsActionTypes {
  return {
    type: SAVE_ANSWER,
    authedUser,
    questionId,
    answer,
  }
}

export function handleAddQuestion (optionOneText: string, optionTwoText: string) {
  return (dispatch: Function, getState: Function) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
    .then((question: Question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading));
  }
}