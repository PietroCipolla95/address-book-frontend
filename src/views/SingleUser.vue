<script>
import axios from 'axios';

export default {
    name: 'SingleUser',
    data() {
        return {
            user: {},
        };
    },
    mounted() {
        // Fetch user details based on the received "id" prop
        this.fetchUserDetails();
    },
    methods: {
        fetchUserDetails() {
            // Example: Fetch user details from the API using axios
            // Replace this with your actual API endpoint
            axios.get(`http://localhost:8000/api/user/${this.$route.params.id}`)
                .then(response => {
                    this.user = response.data.user;
                    console.log(this.user);
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                });
        },
    },
};
</script>
<template>
    <div>
        <h2>User Details</h2>
        <div>
            <p><strong>ID:</strong> {{ user.id }}</p>
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Type:</strong> {{ user.type }}</p>
            <!-- Add other user details as needed -->
        </div>
    </div>
</template>



<style lang="scss" scoped></style>