<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {

  },
}

</script>

<template>
  <AppHeader />

  <main class=" min-vh-100 py-5">

    <router-view>

    </router-view>


  </main>
  <footer>

  </footer>
</template>

<style scoped>
main {
  background-color: grey;
}
</style>
