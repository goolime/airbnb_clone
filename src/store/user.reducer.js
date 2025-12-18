

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

const initialState = {
  loggedInUser: JSON.parse(sessionStorage.getItem('loggedInUser')) || null
};

export function userReducer(state = initialState, cmd) {
  var ans = state;
  switch (cmd.type) {
    case SET_USER:
      ans= { ...state, loggedInUser: cmd.user };
      break
    case REMOVE_USER:
      ans= { ...state, loggedInUser: null };
      break
    case ADD_TO_WISHLIST:
      if (!state.loggedInUser) return state;
      ans= {...state , loggedInUser: {
        ...state.loggedInUser,
        wishlist: [...(state.loggedInUser.wishlist || []), cmd.propertyId]
      }};
      break
    case REMOVE_FROM_WISHLIST:
      if (!state.loggedInUser) return state;
      ans= {...state , loggedInUser: {
        ...state.loggedInUser,
        wishlist: (state.loggedInUser.wishlist || []).filter(id => id !== cmd.propertyId)
      }};
      break
    
    default:
      break;
  }
  sessionStorage.setItem('loggedInUser', JSON.stringify(ans.loggedInUser));
  return ans;
}

