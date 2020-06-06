import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { getUsers, addUserAnswer, addUserQuestion } from './users';
import { getQuestions, saveAnswer, addQuestion } from './questions';
import { AnswerOption, Question } from '../models/question';

export function handleInitialData() {
  return (dispatch: Function) => {
    dispatch(showLoading());
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
        dispatch(hideLoading());
      })
  }
}

export function handleSaveAnswer(questionId: string, answer: AnswerOption) {
  return (dispatch: Function, getState: Function) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return _saveQuestionAnswer({
      authedUser,
      qid: questionId,
      answer,
    })
    .then(() => {
      dispatch(saveAnswer(authedUser, questionId, answer));
      dispatch(addUserAnswer(authedUser, questionId, answer))
    })
    .then(() => dispatch(hideLoading()));
  }
}

export function handleAddQuestion(optionOneText: string, optionTwoText: string) {
  return (dispatch: Function, getState: Function) => {
    const { authedUser: author } = getState();

    dispatch(showLoading())

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    })
    .then((question: Question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(author, question.id));
    })
    .then(() => dispatch(hideLoading()));
  }
}