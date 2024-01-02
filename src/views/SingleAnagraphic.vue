<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'SingleAnagraphic',
    data() {
        return {
            anagraphic: {},
            contacts: [],
            contact: {},
            newContact: {},
            errors: {}
        };
    },
    mounted() {
        this.fetchAnagraphicDetails();
        //this.fetchContacts();
    },
    methods: {
        fetchAnagraphicDetails() {
            axios.get(`http://localhost:8000/api/anagraphic/${this.$route.params.id}`)
                .then(response => {
                    this.anagraphic = response.data.result;
                    console.log(this.anagraphic);
                    this.fetchContacts()
                })
                .catch(error => {
                    console.error('Error fetching anagraphic details:', error);
                });
        },
        fetchContacts() {
            axios
                .get(`http://127.0.0.1:8000/api/anagraphic/${this.$route.params.id}/contacts`)
                .then(response => {
                    this.anagraphic.contacts = response.data.contacts;
                })
                .catch(error => {
                    console.error('Error fetching contacts:', error);
                });
        },
        addContact() {
            const payload = {
                contact: this.newContact.contact,
                type: this.newContact.type,
                notes: this.newContact.notes,
            };

            console.log('Add Contact Payload:', payload);

            axios.post(`http://127.0.0.1:8000/api/anagraphic/${this.anagraphic.id}/contact`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {

                    console.log('Add Contact Response:', response.data);
                    this.success = response.data
                    this.newContact = {}
                    this.errors = {}
                    this.fetchContacts();
                })
                .catch(error => {
                    console.error('Add Contact Error:', error.response.data);
                    if (error.response.status === 422) {
                        // Set the errors property with the validation error messages
                        this.errors = error.response.data.errors;
                    }
                });
        },

        deleteContact(contact) {

            console.log(contact);

            axios
                .delete(`http://127.0.0.1:8000/api/contact/${contact.id}`)
                .then(response => {
                    console.log(response.data);
                    this.fetchContacts();
                })
                .catch(error => {
                    console.error('Error deleting contact:', error);
                });
        },
    },
    computed: {
        ...mapState(['loggedUser']),
        isAdmin() {
            return this.loggedUser.type === 'admin'
        },
    }
};
</script>
<template>
    <section class="container text-center">

        <!-- row wrapper -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-5">

            <!-- col with anagraphic details -->
            <div class="col">
                <h2 class="pb-4">
                    Anagraphic Details
                </h2>

                <!-- infos -->
                <div>
                    <img :src="'http://127.0.0.1:8000/storage/' + anagraphic.photo" alt="" class="my_img pb-4">
                    <p><strong>ID:</strong> {{ anagraphic.id }}</p>
                    <p><strong>Name:</strong> {{ anagraphic.name }}</p>
                    <p><strong>Note:</strong> {{ anagraphic.notes || 'N/A' }}</p>

                    <!-- edit link -->
                    <router-link v-if="isAdmin" :to="{ name: 'anagraphic-edit', params: { id: anagraphic.id } }"
                        class="btn btn-info px-4">
                        Edit
                    </router-link>

                </div>

                <!-- contact creation wrapper -->
                <div v-if="isAdmin">
                    <h3 class="pt-5 pb-3">Contact Create</h3>

                    <!-- errors -->
                    <div v-if="errors.contact" class="text-dark bg-danger py-3 my-2 w-50 mx-auto rounded-3">{{
                        errors.contact[0]
                    }}</div>

                    <!-- Form for adding a new contact -->
                    <form @submit.prevent="addContact" class="w-75 m-auto text-start">

                        <!-- contact -->
                        <div class="form-group">
                            <label>Contact</label>
                            <input v-model="newContact.contact" type="text" class="form-control" required>
                        </div>

                        <!-- types -->
                        <div class="form-group py-3">
                            <label>Type</label>
                            <select class="form-control" v-model="newContact.type" required>
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="telephone">Telephone</option>
                                <option value="fax">Fax</option>
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="email">Email</option>
                                <option value="altro">altro</option>
                            </select>
                        </div>

                        <!-- notes -->
                        <div class="form-group">
                            <label>Notes</label>
                            <textarea v-model="newContact.notes" class="form-control"></textarea>
                        </div>

                        <button type="submit" class="btn btn-dark btn-outline-info mt-4">
                            Add Contact
                        </button>
                    </form>
                </div>





            </div>


            <!-- col with existing contacts -->
            <div class="col">

                <h2 class="pb-4">
                    Contacts List
                </h2>

                <!-- Display existing contacts -->
                <ul class=" list-unstyled">
                    <li v-for="(contact, index) in anagraphic.contacts" :key="index"
                        class=" bg-dark text-light rounded-5 my-2 p-3">

                        <!-- wrapper for infos -->
                        <div>
                            <span class="text-info fw-bolder">{{ contact.type }}</span>
                            <p class="m-0">
                                {{ contact.contact }}
                            </p>
                            <p>
                                {{ contact.notes }}
                            </p>
                        </div>

                        <!-- wrapper for actions -->
                        <div v-if="isAdmin">
                            <router-link :to="{ name: 'contact-edit', params: { id: contact.id } }"
                                class="btn btn-secondary me-3">
                                Edit
                            </router-link>

                            <button class="btn btn-danger" @click="deleteContact(contact)">
                                Delete
                            </button>
                        </div>

                    </li>
                </ul>

            </div>

        </div>


    </section>
</template>
  
  
<style lang="scss" scoped>
.my_img {
    border-radius: 50%;
}
</style>
  