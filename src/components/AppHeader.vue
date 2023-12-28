<script>
import { mapState } from 'vuex'

export default {
    name: 'AppHeader',
    methods: {
        logout() {
            // Clear token
            localStorage.removeItem('token');

            // Clear logged user using mutation
            this.$store.commit('clearLoggedUser');

            // Redirect to login page
            this.$router.push('/login');
        },
    },
    computed: {
        ...mapState(['loggedUser']),
        isAdmin() {
            return this.loggedUser.type === 'admin'
        },
        isUserLoggedIn() {
            return Object.keys(this.loggedUser).length > 0;
        },
    },
}
</script>
<template>
    <header v-if="isUserLoggedIn">
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container">


                <!-- dropdown button responsive -->
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                    aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- navbar items -->
                <div class="collapse navbar-collapse p-3" id="mainNav">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item pe-3">
                            <router-link to="/">
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item pe-3">
                            <router-link to="/anagraphics">
                                Anagraphics
                            </router-link>
                        </li>
                        <li class="nav-item pe-3" v-if="isAdmin">
                            <router-link to="/users">
                                Users
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/contact">
                                Contacts
                            </router-link>
                        </li>
                    </ul>
                    <button class="btn btn-outline-danger" @click="logout" v-if="isUserLoggedIn">
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    </header>
</template>



<style lang="scss" scoped>
a {
    text-decoration: none;
    color: orange;
    font-size: 1.3rem;
}
</style>