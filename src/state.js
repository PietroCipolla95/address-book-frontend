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
        },
        clearLoggedUser(state) {
            state.loggedUser = {};
        },
    }
})

export default store