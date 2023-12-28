<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      user: {},
      users: [],
      success: '',
    }
  },
  methods: {

  },
  mounted() {

  },
}

</script>

<template>
  <header>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <router-link to="/users">
            users
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Nav 2</a>
        </li>
      </ul>
    </nav>
  </header>

  <main class=" min-vh-100">

    <router-view class="container">

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
