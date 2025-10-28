import { usersService } from '../services/users.service';
import { SET_USER, REMOVE_USER } from '../store/user.reducer.js';
import { store } from '../store/store.js';

export function login(userName, password) {
    return usersService.login(userName, password)
        .then(user => {
            store.dispatch({ type: SET_USER, user });
            return user;
        })
        .catch(err => {
            console.error('Login failed', err);
            throw err;
        });
}

export function logout() {
    return store.dispatch({ type: REMOVE_USER });
}