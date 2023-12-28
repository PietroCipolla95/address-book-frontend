<script>
import axios from 'axios';
import store from './state';

export default {
    name: 'Login',
    data() {
        return {
            state: store.state,
            user: {},
            errors: {},
        };
    },
    methods: {

        async loginUser() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/user/login', this.user);

                if (response.data.status) {
                    // Successful login save the token
                    localStorage.setItem('token', response.data.token);

                    // set user with all infos
                    store.commit('setLoggedUser', response.data.user);

                    // Redirect to home
                    this.$router.push('/');
                } else {
                    // Unsuccessful login
                    this.errors = response.data.errors;
                    console.log(this.errors);
                }

            } catch (error) {
                if (error.response && error.response.status === 422) {
                    // Validation errors
                    this.errors = error.response.data.errors;
                    console.log(this.errors);
                } else if (error.response && error.response.status === 401) {
                    // Unauthorized (invalid credentials)
                    this.errors = { message: 'Invalid credentials' };
                    console.log(this.errors);
                } else {
                    console.error('Login error:', error);
                }
            }
        },
    },
}
</script>


<template>
    <section class="container">


        <div class="row">

            <div class="col-lg-4 col-md-6 col-10 m-auto">

                <h2 class="text-center pb-3">
                    Login
                </h2>

                <!-- errors -->
                <div v-if="Object.keys(errors).length > 0" class="alert alert-danger">
                    <p v-if="errors.message">{{ errors.message }}</p>
                    <ul v-else>
                        <li v-for="(error, field) in errors" :key="field">{{ error[0] }}</li>
                    </ul>
                </div>

                <!-- login form -->
                <form @submit.prevent="loginUser">

                    <!-- name -->
                    <div class="form-group">
                        <label for="email">Name:</label>
                        <input type="text" v-model="user.name" class="form-control" />
                    </div>

                    <!-- password -->
                    <div class="form-group py-3">
                        <label for="password">Password:</label>
                        <input type="password" v-model="user.password" class="form-control" />
                    </div>

                    <!-- login -->
                    <button type="submit" class="btn btn-dark btn-outline-info mt-4">
                        Login
                    </button>

                </form>

            </div>


        </div>

    </section>
</template>



<style lang="scss" scoped></style>