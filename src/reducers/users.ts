import { UserById } from '../models/user';
import {
  UsersActionTypes,
  GET_USERS,
  ADD_USER_ANSWER
} from '../actions/users';

const initialState: UserById = {};
export default function users(
  state = initialState,
  action: UsersActionTypes
): UserById {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_USER_ANSWER:
      const { authedUser, questionId, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [questionId]: answer,
          },
        },
      }
    default:
      return state;
  }
}