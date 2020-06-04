import {
  AuthedUserActionTypes,
  SET_AUTHED_USER,
  UNSET_AUTHED_USER,
} from "../actions/authUser";

const initialState: string | null = null;

export default function authedUser(
  state = initialState,
  action: AuthedUserActionTypes,
): string | null {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    case UNSET_AUTHED_USER:
      return null;
    default:
      return state;
  }
}