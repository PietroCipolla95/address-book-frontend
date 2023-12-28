<script>
import axios from 'axios';

export default {
    name: 'AnagraphicEdit',
    data() {
        return {
            anagraphic: {},
            errors: {},
        };
    },
    mounted() {
        this.fetchAnagraphicDetails();
    },
    methods: {
        updateAnagraphic() {
            axios
                .patch(`http://localhost:8000/api/anagraphic/${this.$route.params.id}`, this.anagraphic)
                .then((res) => {
                    this.$router.push({ name: 'anagraphics-view' });
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                });
        },
        fetchAnagraphicDetails() {
            axios.get(`http://localhost:8000/api/anagraphic/${this.$route.params.id}`)
                .then(response => {
                    this.anagraphic = {
                        name: response.data.result.name,
                        notes: response.data.result.notes,
                    };
                })
                .catch(error => {
                    console.error('Error fetching anagraphic details:', error);
                });
        },
    },
};
</script>
<template>
    <section class="container">
        <h3 class="text-center pb-4">Edit Anagraphic</h3>

        <div class="row">
            <div class="col-lg-4 col-md-6 col-10 m-auto">

                <!-- errors messages -->
                <div v-if="Object.keys(errors).length > 0" class="alert alert-danger">
                    <ul>
                        <li v-for="(error, field) in errors" :key="field">{{ error[0] }}</li>
                    </ul>
                </div>

                <form @submit.prevent="updateAnagraphic">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="anagraphic.name">
                    </div>

                    <!-- note (optional) -->
                    <div class="form-group py-3">
                        <label>Note (optional)</label>
                        <textarea class="form-control" v-model="anagraphic.notes" rows="3"></textarea>
                    </div>

                    <button type="submit" class="btn btn-dark btn-outline-info mt-4">Update</button>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>
  
  