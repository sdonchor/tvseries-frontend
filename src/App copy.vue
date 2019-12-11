<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <h1>TvSeries</h1>
      </div>

      <v-spacer></v-spacer>

      <Login></Login>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/Index';
import Login from './components/Login'
export default {
  name: 'App',

  components: {
    HelloWorld,
    Login
  },

  data: () => ({
    //
  }),
};
</script>
