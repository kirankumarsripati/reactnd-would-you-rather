import { showLoading, hideLoading } from 'react-redux-loading'
import { _getUsers, _getQuestions, _saveQuestionAnswer } from '../utils/_DATA'
import { getUsers, addUserAnswer } from './users';
import { getQuestions, saveAnswer } from './questions';
import { AnswerOption } from '../models/question';

export function handleInitialData() {
  return (dispatch: Function) => {
    dispatch(showLoading());
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
        dispatch(hideLoading);
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