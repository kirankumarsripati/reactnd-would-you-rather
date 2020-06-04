import {
  QuestionsActionTypes,
  GET_QUESTIONS,
  ADD_QUESTION,
  SAVE_ANSWER
} from "../actions/questions";
import { QuestionById } from "../models/question";

const initialState: QuestionById = {}

export default function questions(
  state = initialState,
  action: QuestionsActionTypes,
): QuestionById {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }
    case ADD_QUESTION: {
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      }
    }
    case SAVE_ANSWER: {
      const { authedUser, questionId, answer } = action;
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answer]: {
            ...state[questionId][answer],
            votes: state[questionId][answer].votes.concat([authedUser])
          }
        }
      }
    }
    default:
      return state;
  }
}