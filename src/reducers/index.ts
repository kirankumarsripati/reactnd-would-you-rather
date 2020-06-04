import { combineReducers, Reducer } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

import authedUser from './authedUser';
import users from './users';
import questions from './questions';
import { UserById } from '../models/user';
import { QuestionById } from '../models/question';

export interface RootState {
  authedUser: string | null,
  users: UserById,
  questions: QuestionById,
  loadingBar: Reducer,
}

export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
})