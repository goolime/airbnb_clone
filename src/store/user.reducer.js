export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

const initialState = {
  loggedInUser: null
};

export function userReducer(state = initialState, cmd) {
  switch (cmd.type) {
    case SET_USER:
      return { ...state, loggedInUser: cmd.user };
    case REMOVE_USER:
      return { ...state, loggedInUser: null };
    case ADD_TO_WISHLIST:
      if (!state.loggedInUser) return state;
      return {...state , loggedInUser: {
        ...state.loggedInUser,
        wishlist: [...(state.loggedInUser.wishlist || []), cmd.propertyId]
      }};
    case REMOVE_FROM_WISHLIST:
      if (!state.loggedInUser) return state;
      return {...state , loggedInUser: {
        ...state.loggedInUser,
        wishlist: (state.loggedInUser.wishlist || []).filter(id => id !== cmd.propertyId)
      }};
    default:
      return state;
  }
}
