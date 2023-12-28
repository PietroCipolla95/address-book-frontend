<script>
import axios from 'axios';

export default {
    name: 'App',
    components: {

    },
    data() {
        return {
            user: {},
            users: [],
            success: '',
            errors: {},
        }
    },
    methods: {

        fetchUsers() {
            axios
                .get('http://127.0.0.1:8000/api/users')
                .then(response => {
                    if (response.data.success) {
                        this.users = response.data.users;
                    } else {
                        console.error('Error fetching users:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        },

        addUser() {
            console.log(this.user);
            axios
                .post('http://127.0.0.1:8000/api/user', this.user)
                .then(response => {
                    this.success = response.data;
                    this.fetchUsers();
                })
                .catch(error => {
                    console.error('Request failed:', error.response);

                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },

        deleteUser(id) {
            axios
                .delete(`http://127.0.0.1:8000/api/user/${id}`)
                .then(response => {
                    // Update the local users array after successful deletion
                    this.users = this.users.filter(user => user.id !== id);
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        }

    },
    mounted() {
        this.fetchUsers();
    },
}

</script>

<template>
    <section id="users" class="container">

        <div class="row">

            <!-- column with create user form -->
            <div class="col-12 col-lg-5">

                <h3 class="text-center pb-4">Create User</h3>

                <!-- errors -->
                <div v-if="Object.keys(errors).length > 0" class="alert alert-danger">
                    <ul>
                        <li v-for="(error, field) in errors" :key="field">{{ error[0] }}</li>
                    </ul>
                </div>


                <form @submit.prevent="addUser" class="w-75">

                    <!-- name -->
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="user.name">
                    </div>

                    <!-- password -->
                    <div class="form-group py-3">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="user.password">
                    </div>

                    <!-- type -->
                    <div class="form-group">
                        <label>Type</label>
                        <select class="form-control w-25" v-model="user.type">
                            <option value="admin">Admin</option>
                            <option value="operator">Operator</option>
                        </select>
                    </div>

                    <!-- submit button -->
                    <button type="submit" class="btn btn-dark btn-outline-info mt-4">
                        Create
                    </button>

                </form>
            </div>

            <div class="col-12 col-lg-7">

                <h3 class="text-center pb-4">Users List</h3>
                <table class="table table-sm table-borderless table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.type }}</td>
                            <td>

                                <router-link :to="{ name: 'user-edit', params: { id: user.id } }" class="btn btn-secondary">
                                    Edit
                                </router-link>

                                <router-link :to="{ name: 'user-show', params: { id: user.id } }" class="btn btn-info mx-1">
                                    View
                                </router-link>

                                <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>

                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>

    </section>
</template>

<style scoped>
th,
td {
    text-align: center;
}
</style>