export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const UNSET_AUTHED_USER = 'UNSET_AUTHED_USER';

interface SetAuthedUserAction {
  type: typeof SET_AUTHED_USER,
  id: string,
}

interface UnsetAuthedUserAction {
  type: typeof UNSET_AUTHED_USER,
}

export type AuthedUserActionTypes = SetAuthedUserAction | UnsetAuthedUserAction;

export function setAuthedUser(id: string): AuthedUserActionTypes {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function unsetAuthedUser(): AuthedUserActionTypes {
  return {
    type: UNSET_AUTHED_USER,
  }
}