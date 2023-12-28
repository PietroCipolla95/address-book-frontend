<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'Anagraphics',
    data() {
        return {
            anagraphic: {},
            anagraphics: [],
            success: '',
            errors: {},
            searchKeyword: '',
        }
    },
    methods: {

        fetchAnagraphics() {
            axios
                .get('http://127.0.0.1:8000/api/anagraphics')
                .then(response => {
                    if (response.data.success) {
                        this.anagraphics = response.data.result;
                    } else {
                        console.error('Error fetching anagraphics:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error fetching anagraphics:', error);
                });
        },

        addAnagraphic() {

            axios
                .post('http://127.0.0.1:8000/api/anagraphic', this.anagraphic)
                .then(response => {
                    this.success = response.data;
                    console.log(this.success);
                    this.fetchAnagraphics();
                })
                .catch(error => {
                    console.error('Request failed:', error.response);

                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },

        searchAnagraphics() {
            axios
                .get(`http://127.0.0.1:8000/api/anagraphics/search?keyword=${this.searchKeyword}`)
                .then(response => {
                    if (response.data.success) {
                        this.anagraphics = response.data.result;
                    } else {
                        console.error('Error searching anagraphics:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error searching anagraphics:', error);
                });
        },

        deleteAnagraphic(id) {
            axios
                .delete(`http://127.0.0.1:8000/api/anagraphic/${id}`)
                .then(response => {
                    // Update the local anagraphics array after successful deletion
                    this.anagraphics = this.anagraphics.filter(anagraphic => anagraphic.id !== id);
                })
                .catch(error => {
                    console.error('Error deleting anagraphic:', error);
                });
        },

    },
    mounted() {
        this.fetchAnagraphics();

    },
    computed: {
        ...mapState(['loggedUser']),
        isAdmin() {
            return this.loggedUser.type === 'admin'
        },
    }
}

</script>

<template>
    <section id="anagraphics" class="container">


        <div class="row">

            <!-- column with create anagraphic form -->
            <div class="col-12 col-lg-5" v-if="isAdmin">

                <h3 class="text-center pb-4">Create Anagraphic</h3>

                <!-- errors -->
                <div v-if="Object.keys(errors).length > 0" class="alert alert-danger">
                    <ul>
                        <li v-for="(error, field) in errors" :key="field">{{ error[0] }}</li>
                    </ul>
                </div>

                <form @submit.prevent="addAnagraphic" method="post" class="w-75" enctype="multipart/form-data">

                    <!-- name -->
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="anagraphic.name">
                    </div>

                    <!-- photo (optional) -->
                    <div class="form-group py-3">
                        <label>Photo (optional)</label>
                        <input type="file" name="photo" id="photo" class="form-control">
                    </div>

                    <!-- note (optional) -->
                    <div class="form-group">
                        <label>Note (optional)</label>
                        <textarea class="form-control" v-model="anagraphic.notes" rows="3"></textarea>
                    </div>

                    <!-- submit button -->
                    <button type="submit" class="btn btn-dark btn-outline-info mt-4">
                        Create
                    </button>

                </form>
            </div>

            <!-- column with  anagraphic list -->
            <div class="col-12 col-lg-7 mx-auto">

                <h3 class="text-center pb-4">Anagraphics List</h3>

                <div class="mb-5">
                    <label for="searchKeyword" class="form-label">Search Anagraphics</label>
                    <input v-model="searchKeyword" type="text" id="searchKeyword" class="form-control"
                        @input="searchAnagraphics">
                </div>

                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

                    <!-- dinamic anagraphic generation -->
                    <div class="col" v-for="anagraphic in anagraphics" :key="anagraphic.id">
                        <div class="card p-2 text-center bg-dark text-info">
                            <img class="my_img pb-3" :src="'http://127.0.0.1:8000/storage/' + anagraphic.photo" alt="">

                            <h2>
                                <router-link :to="{ name: 'anagraphic-show', params: { id: anagraphic.id } }">
                                    {{ anagraphic.name }}
                                </router-link>
                            </h2>

                            <div id="actions" v-if="isAdmin">
                                <router-link :to="{ name: 'anagraphic-edit', params: { id: anagraphic.id } }"
                                    class="btn btn-secondary">
                                    Edit
                                </router-link>

                                <router-link :to="{ name: 'anagraphic-show', params: { id: anagraphic.id } }"
                                    class="btn btn-info mx-1">
                                    View
                                </router-link>

                                <button class="btn btn-danger" @click="deleteAnagraphic(anagraphic.id)">
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>


                </div>



            </div>

        </div>

    </section>
</template>

<style scoped>
a {
    text-decoration: none;
    color: white;
}

.my_img {
    border-radius: 50%;
}
</style>
