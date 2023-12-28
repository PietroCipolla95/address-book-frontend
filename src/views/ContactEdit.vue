<script>
import axios from 'axios';

export default {
    name: 'ContactEdit',
    data() {
        return {
            contact: {},
            errors: {},
            success: '',
            route_id: '',
        };
    },
    mounted() {
        this.fetchContactDetails();
    },
    methods: {
        updateContact() {
            axios
                .patch(`http://localhost:8000/api/contact/${this.$route.params.id}`, this.contact)
                .then((response) => {
                    console.log(response);
                    this.success = response.data.success
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchContactDetails() {
            axios.get(`http://localhost:8000/api/contacts/${this.$route.params.id}`)
                .then(response => {

                    console.log(response);

                    this.route_id = response.data.contact.anagraphic_id

                    this.contact = {
                        contact: response.data.contact.contact,
                        notes: response.data.contact.notes,
                        type: response.data.contact.type
                    };
                })
                .catch(error => {
                    console.error('Error fetching contact details:', error);
                });
        },
    },
};
</script>
<template>
    <section class="container">
        <h3 class="text-center pb-4">Edit Contact</h3>

        <div class="row">
            <div class="col-lg-4 col-md-6 col-10 m-auto">

                <form @submit.prevent="updateContact">
                    <div class="form-group">
                        <label>Contact</label>
                        <input type="text" class="form-control" v-model="contact.contact">
                    </div>

                    <!-- types -->
                    <div class="form-group py-3">
                        <label>Type</label>
                        <select class="form-control" v-model="contact.type" required>
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="telephone">Telephone</option>
                            <option value="fax">Fax</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="email">Email</option>
                            <option value="altro">altro</option>
                        </select>
                    </div>

                    <!-- note (optional) -->
                    <div class="form-group py-3">
                        <label>Note (optional)</label>
                        <textarea class="form-control" v-model="contact.notes" rows="3"></textarea>
                    </div>

                    <p v-if="success" class="p-3 fw-bolder bg-success text-dark border border-dark rounded-3">
                        Contact updated!

                        <router-link :to="{ name: 'anagraphic-show', params: { id: route_id } }">
                            go back
                        </router-link>

                    </p>

                    <button type="submit" class="btn btn-dark btn-outline-info mt-4">Update</button>

                </form>
            </div>


        </div>
    </section>
</template>



<style lang="scss" scoped></style>