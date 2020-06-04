import {
  Action,
  Middleware,
  MiddlewareAPI,
  AnyAction,
  Dispatch
} from "redux";

const logger: Middleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: Action) => {
  console.group(action.type);
    console.log('The action: ', action);
    const returnValue = next(action);
    console.log('The new state', store.getState);
  console.groupEnd()
  return returnValue;
}

export default logger;