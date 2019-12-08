<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-text-field
              label="Username"
              v-model="login_form.username"
            ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
              label="Password"
              type="password"
              v-model="login_form.password"
            ></v-text-field>
      </v-row>
    </v-container>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function(){
    return{
      authdata : null,
      login_form: {
        username: null,
        password: null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
