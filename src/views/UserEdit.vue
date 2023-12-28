<script>
import axios from 'axios';

export default {
    name: 'UserEdit',

    data() {
        return {
            user: {},
        }
    },

    methods: {
        updateUser() {
            // Assuming you have the necessary user data in the 'user' object
            axios
                .patch(`http://localhost:8000/api/user/${this.$route.params.id}`, this.user)
                .then((res) => {
                    // Assuming you want to redirect to the 'home' route after successful update
                    this.$router.push({ name: 'users-view' });
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                });
        }
    }

}
</script>


<template>
    <div>
        <h3 class="text-center">Edit User</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateUser">
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
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>