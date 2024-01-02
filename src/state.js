import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            loggedUser: JSON.parse(localStorage.getItem('loggedUser')) || {},
        }
    },
    mutations: {
        setLoggedUser(state, user) {
            state.loggedUser = user;
            localStorage.setItem('loggedUser', JSON.stringify(user));
        },
        clearLoggedUser(state) {
            state.loggedUser = {};
            localStorage.removeItem('loggedUser');
        },
    }
})

export default store