import { UserById } from '../models/user';
import {
  UsersActionTypes,
  GET_USERS,
  ADD_USER_ANSWER,
  ADD_USER_QUESTION
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
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.questionId]),
        }
      }
    default:
      return state;
  }
}
