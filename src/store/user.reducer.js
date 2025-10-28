export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

const initialState = {
  loggedInUser: null
};

export function userReducer(state = initialState, cmd) {
  switch (cmd.type) {
    case SET_USER:
      return { ...state, loggedInUser: cmd.user };
    case REMOVE_USER:
      return { ...state, loggedInUser: null };
    default:
      return state;
  }
}
