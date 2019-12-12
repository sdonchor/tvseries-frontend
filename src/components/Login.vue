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
      <v-row align="center" justify="center">
        <v-btn color="red accent-2" @click.stop="logIn">Zaloguj</v-btn></v-row
      >
      <span class="logInError">{{ message }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import authdata from '../authdata'
export default {
  props: ["dialogmodel"],
  name: "Login",
  data: function() {
    return {
      authdata: null,
      login_form: {
        username: null,
        username: null
      },
      message: ""
    };
  },
  methods: {
    logIn() {
      if (
        this.login_form &&
        this.login_form.username &&
        this.login_form.password
      ) {
        axios
          .post("https://tv-series-ssi.herokuapp.com/authenticate", {
            mail: this.login_form.username,
            password: this.login_form.password
          })
          .then(response => {
            let auth = response.data;
            if (auth.jwt) {
              this.message = "";
              authdata.auth = auth;
              const authcookie = JSON.stringify({
                jwt: auth.jwt,
                idUser: auth.idUser
              });
       
             this.$cookie.set("auth",authcookie,1);
              this.$emit("loggedIn", auth);
            }
          }).catch((err)=>{
            this.message = "Nieprawidłowy login lub hasło.";
          });
      } else {
        this.message = "Wypełnij oba pola.";
      }
    },
    async loginCheck(){
      const authstr = this.$cookie.get('auth')
      if(authstr)
      {
        const authcookie = JSON.parse(authstr);
        let userdata = await this.getUser(authcookie.idUser,authcookie.jwt);
        let auth = userdata;
        auth.jwt = authcookie.jwt
        this.$emit("loggedIn",auth);
      }
    },
    getUser(id,jwt){
      return new Promise((resolve,reject)=>{
        
        axios.get('https://tv-series-ssi.herokuapp.com/api/users/'+id,{headers:{
          Authenticate: 'Bearer '+jwt
        }}).then(response=>{
          resolve(response.data);
        }).catch(err=>{
          reject(err);
        })
      })
    }
  },
  mounted(){
    this.loginCheck();
  }
};
</script>

<style scoped>
.logInError {
  color: red;
  font-size: 15px;
}
</style>
