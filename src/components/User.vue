<template>
  <div>
    <div v-if="response">
      <h1>{{response.firstName}} {{response.lastName}}</h1>
    </div>
    <div v-if="response.friendsSet.length > 0">
      <h2>Znajomi</h2>
      <v-list-item :key="idx" v-for="friend in response.friendsSet">
        <v-list-item-title
                class="font-weight-bold"
                @click.stop="goto(friend.idUser)"
        >{{ friend.firstName }} {{ friend.lastName }}</v-list-item-title>
      </v-list-item>
      <h2>Obejrzane seriale</h2>
      <div v-if="response.watchedEpisodes.length > 0">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Lista odcinków</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item
                      :key="idx"
                      v-for="(episode, idx) in response.watchedEpisodes"
              >
                <v-list-item-title class="font-weight-bold"
                >{{ episode.title }}</v-list-item-title
                >
                <v-list-item-subtitle>s{{ episode.season }}e{{
                  episode.episodeNumber
                  }}</v-list-item-subtitle>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <p v-else>Nie obejrzałeś żadnego serialu! Dodaj odcinki do obejrzanych, aby je przejrzeć.</p>
    </div>
    <div v-else>
      {{loadingmessage}}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authdata from "../authdata";
export default {
  name: "User",
  data() {
    return {
      response: null,
      loadingmessage: "Ładowanie...",
      auth: authdata.auth
    };
  },
  methods: {
    refreshAuth() {
      this.auth = authdata.auth;
    },
    unauthorized() {
      this.loadingmessage = "Zawartość dostępna dla zalogowanych użytkowników.";
    },
    goto(id) {
      const path = "users/" + id;
      this.$router.push(path);
    },
    getShowInfo() {
      this.refreshAuth();
      if (!this.auth) {
        this.unauthorized();
        return;
      }
      const authstr = "Bearer " + this.auth.jwt;
      axios
        .get(
          "https://tv-series-ssi.herokuapp.com/api/users/" + this.$route.params.id,
          {
            headers: {
              Authorization: authstr
            }
          }
        )
        .then(response => {
          this.loadingmessage="";
          this.response = response.data;
        })
        .catch(error => {
          this.unauthorized();
        });
    }
  },
  mounted() {
    this.getShowInfo();
  }
};
</script>

<style scoped></style>
