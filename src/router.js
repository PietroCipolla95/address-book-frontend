import { createWebHashHistory, createRouter } from 'vue-router';

import AppHome from './views/AppHome.vue';
import UsersView from './views/UsersView.vue';
import UserEdit from './views/UserEdit.vue';
import SingleUser from './views/SingleUser.vue';
import Login from './Login.vue';
import AnagraphicsView from './views/AnagraphicsView.vue';
import SingleAnagraphic from './views/SingleAnagraphic.vue';
import AnagraphicEdit from './views/AnagraphicEdit.vue';
import ContactEdit from './views/ContactEdit.vue';
import ContactSearch from './views/ContactSearch.vue';


const router = createRouter({

    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/users',
            name: 'users-view',
            component: UsersView,
            meta: { requiresAuth: true },
        },
        {
            path: '/users/:id',
            name: 'user-edit',
            component: UserEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/user/:id',
            name: 'user-show',
            component: SingleUser,
            meta: { requiresAuth: true },
        },
        {
            path: '/anagraphics',
            name: 'anagraphics-view',
            component: AnagraphicsView,
            meta: { requiresAuth: true },
        },
        {
            path: '/anagraphics/:id',
            name: 'anagraphic-show',
            component: SingleAnagraphic,
            meta: { requiresAuth: true },
        },
        {
            path: '/anagraphic/:id',
            name: 'anagraphic-edit',
            component: AnagraphicEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/contact/:id',
            name: 'contact-edit',
            component: ContactEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/contact',
            name: 'contact-search',
            component: ContactSearch,
            meta: { requiresAuth: true },
        },
    ]
});


// Route guard

router.beforeEach((to, from, next) => {

    // check if the route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!localStorage.getItem('token')) {
            // User is not authenticated, redirect to login
            next('/login');
        } else {
            // User is authenticated, proceed to the requested route
            next();
        }
    } else {
        // Route doesn't require authentication, allow access
        next();
    }
})



export { router }