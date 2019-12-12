<template>
  <v-card>
    <v-card-title>
      Logowanie
    </v-card-title>
    <v-card-text>
      <v-text-field label="Login" v-model="login_form.username"></v-text-field>
      <v-text-field
        label="Hasło"
        type="password"
        v-model="login_form.password"
      ></v-text-field>
     <v-row align="center" justify="center"> <v-btn color="red accent-2" @click.stop="logIn">Zaloguj</v-btn></v-row>
     <span class="logInError">{{message}}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["dialogmodel"],
  name: "Login",
  data: function() {
    return {
      authdata: null,
      login_form: {
        username: null,
        password: null
      },
      message: '',
    };
  },
  methods: {
    logIn() {
      if (
        this.login_form &&
        this.login_form.username &&
        this.login_form.password
      ) {
        //wyslij do api i spytaj czy hasło spoko, response.data do auth
        let auth={username:this.login_form.username};
        if (this.login_form.username == this.login_form.password) {
          this.message='';
          this.$emit("loggedIn",auth);
        }
        else
        {
          this.message="Nieprawidłowy login lub hasło.";
        }
      }
      else
      {
        this.message="Wypełnij oba pola."
      }
    }
  }
};
</script>

<style scoped>

.logInError{
  color:red;
  font-size:15px;
}
</style>
