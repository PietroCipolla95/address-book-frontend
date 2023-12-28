import { createWebHashHistory, createRouter } from 'vue-router';

import AppHome from './views/AppHome.vue';
import UsersView from './views/UsersView.vue';
import UserEdit from './views/UserEdit.vue';
import SingleUser from './views/SingleUser.vue';


const router = createRouter({

    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/users',
            name: 'users-view',
            component: UsersView,
        },
        {
            path: '/users/:id',
            name: 'user-edit',
            component: UserEdit,
        },
        {
            path: '/user/:id',
            name: 'user-show',
            component: SingleUser,
        },
    ]
});

export { router }