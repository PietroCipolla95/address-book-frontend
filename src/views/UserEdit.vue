<script>
import axios from 'axios';

export default {
    name: 'UserEdit',

    data() {
        return {
            user: {},
            errors: {},
        }
    },
    mounted() {
        this.fetchAnagraphicDetails();
    },
    methods: {
        fetchAnagraphicDetails() {
            axios.get(`http://localhost:8000/api/user/${this.$route.params.id}`)
                .then(response => {
                    console.log(response);
                    this.user = {
                        name: response.data.user.name,
                        type: response.data.user.type,
                    };
                })
                .catch(error => {
                    console.error('Error fetching anagraphic details:', error);
                });
        },
        updateUser() {
            // Assuming you have the necessary user data in the 'user' object
            axios
                .patch(`http://localhost:8000/api/user/${this.$route.params.id}`, this.user)
                .then((res) => {
                    // Assuming you want to redirect to the 'home' route after successful update
                    this.$router.push({ name: 'users-view' });
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                });
        }
    }

}
</script>


<template>
    <section class="container">
        <h3 class="text-center pb-4">Edit User</h3>


        <div class="row">

            <div class="col-lg-4 col-md-6 col-10 m-auto">

                <!-- errors messages -->
                <div v-if="Object.keys(errors).length > 0" class="alert alert-danger">
                    <ul>
                        <li v-for="(error, field) in errors" :key="field">{{ error[0] }}</li>
                    </ul>
                </div>

                <form @submit.prevent="updateUser">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="user.name">
                    </div>
                    <div class="form-group py-3">
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
                    <button type="submit" class="btn btn-dark btn-outline-info mt-4">Update</button>
                </form>
            </div>

        </div>
    </section>
</template>


<style lang="scss" scoped></style>