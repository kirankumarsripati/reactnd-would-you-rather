import { AnswerOption } from './question';

export interface User {
  id: string,
  name: string,
  avatarURL: string,
  answers: {
    [key: string]: AnswerOption,
  }
  questions: string[],
}

export interface UserById {
  [key: string]: User
}
