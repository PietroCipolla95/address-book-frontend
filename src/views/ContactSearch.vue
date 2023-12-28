<script>
import axios from 'axios';
import { mapState } from 'vuex'

export default {
    name: 'ContactSearch',
    data() {
        return {
            searchType: '',
            contacts: [],
        };
    },
    computed: {
        filteredContacts() {
            return this.contacts.filter(contact => contact.type.toLowerCase().startsWith(this.searchType.toLowerCase()));
        },
        ...mapState(['loggedUser']),
        isAdmin() {
            return this.loggedUser.type === 'admin'
        },
    },
    methods: {
        searchContacts() {
            axios.get(`http://127.0.0.1:8000/api/contacts/search/${this.searchType}`)
                .then(response => {
                    console.log(response);
                    this.contacts = response.data;
                })
                .catch(error => {
                    console.error('Error fetching contacts:', error);
                });
        },
    },
};
</script>
<template>
    <section class="container">

        <input class="form-control w-25" v-model="searchType" placeholder="Search by contact type"
            @input="searchContacts" />


        <div class="row mt-4 row-cols-1 row-cols-md-2 row-cols-lg-3">

            <div v-for="contact in filteredContacts" :key="contact.id" class="col">

                <!-- wrapper for the card -->
                <div class=" bg-dark text-light rounded-4 my-2 p-4">
                    <!-- wrapper for infos -->
                    <div>
                        <span class="text-info fw-bolder pe-3">{{ contact.type }}</span>
                        <span class="text-warning fw-bolder">id: {{ contact.anagraphic_id }}</span>
                        <p>
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
                </div>

            </div>

        </div>


    </section>
</template>

<style lang="scss" scoped></style>
  
  