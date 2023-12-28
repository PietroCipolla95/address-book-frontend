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
        }
    },
    methods: {
        addUser() {
            console.log(this.user);
            axios
                .post('http://127.0.0.1:8000/api/user', this.user)
                .then(response => {
                    this.success = response.data;
                })
                .catch(error => {
                    console.error('Request failed:', error.response);

                    if (error.response.status === 422) {
                        console.log('Validation errors:', error.response.data.errors);
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
}

</script>

<template>
    <section>

        <div>
            <h2 class="text-center">Products List</h2>

            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.type }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <router-link :to="{ name: 'user-edit', params: { id: user.id } }" class="btn btn-success">
                                    Edit
                                </router-link>

                                <router-link :to="{ name: 'user-show', params: { id: user.id } }" class="btn btn-info">
                                    View Details
                                </router-link>

                                <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div>
            <h3 class="text-center">Create User</h3>
            <div class="row">
                <div class="col-md-6">
                    <form @submit.prevent="addUser">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="user.name">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" v-model="user.password">
                        </div>
                        <div class="form-group">
                            <label>Type</label>
                            <select class="form-control" v-model="user.type">
                                <option value="admin">Admin</option>
                                <option value="operator">Operator</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>