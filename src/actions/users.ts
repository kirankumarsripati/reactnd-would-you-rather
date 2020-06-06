import { AnswerOption } from '../models/question';
import { UserById } from '../models/user';

export const GET_USERS = 'GET_USERS';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

interface GetUsersType {
  type: typeof GET_USERS,
  users: UserById,
}

interface AddUserAnswerType {
  type: typeof ADD_USER_ANSWER,
  authedUser: string,
  questionId: string,
  answer: AnswerOption,
}

interface AddUserQuestionType {
  type: typeof ADD_USER_QUESTION,
  authedUser: string,
  questionId: string,
}

export type UsersActionTypes = GetUsersType
  | AddUserAnswerType
  | AddUserQuestionType;

export function getUsers(users: UserById): UsersActionTypes {
  return {
    type: GET_USERS,
    users,
  }
}

export function addUserAnswer(
  authedUser: string,
  questionId: string,
  answer: AnswerOption
): UsersActionTypes {
  return {
    type: ADD_USER_ANSWER,
    authedUser,
    questionId,
    answer,
  }
}

export function addUserQuestion(
  authedUser: string,
  questionId: string
): UsersActionTypes {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    questionId,
  }
}