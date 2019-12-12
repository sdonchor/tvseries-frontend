<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <!--Lewe menu tutaj-->
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Strona główna</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{path:'/list', params: {user: auth}}" >
          <v-list-item-action>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Moja lista</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/series">
          <v-list-item-action>
            <v-icon>mdi-movie-roll</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Seriale</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item link :to="{path:'/users'}">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Użyszkodnicy</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/settings">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ustawienia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

          <v-list-item link to="/admin">
          <v-list-item-action>
            <v-icon>mdi-tune</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Panel administracyjny</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      <!--Koniec menu-->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="red darken-4"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>SocialWebsiteAboutTvSeriesAndIDontKnowHowToNameIt</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="!auth" x-large color="red accent-2" dark @click="loginform=true"><v-icon>mdi-account</v-icon>Zaloguj</v-btn>
     
      <div v-else><v-btn color="red accent-2" fab small dark style="margin-right:10px;">
                <v-icon>mdi-account</v-icon>
              </v-btn>{{auth.login}}</div>

    <v-dialog v-model="loginform" max-width="500px">
     <Login @loggedIn="loggedIn"></Login>
    </v-dialog>

    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Login from './components/Login'
  export default {
    props: {
      source: String,
    },

    data: () => ({
      loginform: false,
      drawer: null,
      auth: null,
    }),
    methods:{
      loggedIn(auth){
        
        this.loginform=false;
        this.auth=auth;
      }
    },
    created () {
      this.$vuetify.theme.dark = true
    },
    components:{
      Login
    }
  }
</script>

<style>

</style>