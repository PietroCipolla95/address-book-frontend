<script>
import axios from 'axios';

export default {
    name: 'SingleAnagraphic',
    data() {
        return {
            anagraphic: {},
        };
    },
    mounted() {
        this.fetchAnagraphicDetails();
    },
    methods: {
        fetchAnagraphicDetails() {
            axios.get(`http://localhost:8000/api/anagraphic/${this.$route.params.id}`)
                .then(response => {
                    this.anagraphic = response.data.result;
                    console.log(this.anagraphic);
                })
                .catch(error => {
                    console.error('Error fetching anagraphic details:', error);
                });
        },
    },
};
</script>
<template>
    <section class="container text-center">
        <h2 class="pb-4">
            Anagraphic Details
        </h2>
        <div>
            <img :src="'http://127.0.0.1:8000/storage/' + anagraphic.photo" alt="" class="my_img pb-4">
            <p><strong>ID:</strong> {{ anagraphic.id }}</p>
            <p><strong>Name:</strong> {{ anagraphic.name }}</p>
            <p><strong>Note:</strong> {{ anagraphic.notes || 'N/A' }}</p>


            <router-link :to="{ name: 'anagraphic-edit', params: { id: anagraphic.id } }" class="btn btn-info px-4">
                Edit
            </router-link>

        </div>
    </section>
</template>
  
  
<style lang="scss" scoped>
.my_img {
    border-radius: 50%;
}
</style>
  