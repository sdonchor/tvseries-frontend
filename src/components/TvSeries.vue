<template>
  <div>
    <div v-if="response">
      <h1>{{ response.title ? response.title : "brak tytułu" }}</h1>
      <img alt="plakat" :src="response.imageurl" />
      <p>
        {{
          response.description === "[null]"
            ? ""
            : response.description.substr(1, response.description.length - 2)
        }}
      </p>
      <p class="font-italic font-weight-bold">{{ response.genres }}</p>
      <p>
        Liczba sezonów:
        <span class="font-weight-bold">{{
          response.numberOfSeasons ? response.numberOfSeasons : 1
        }}</span>
      </p>
      <div v-if="response.setOfEpisodes.length > 0">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Lista odcinków</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item
                :key="idx"
                v-for="(episode, idx) in response.setOfEpisodes"
              >
                <v-list-item-title class="font-weight-bold"
                  >s{{ episode.season }}e{{
                    episode.episodeNumber
                  }}
                  <v-icon v-if="watchedList.find(ep => ep.idEpisode === episode.idEpisode)">mdi-checkbox-marked</v-icon>
                  <v-icon v-else @click.stop="watched($event, episode.idEpisode)">mdi-checkbox-blank</v-icon>
                </v-list-item-title
                >
                <v-list-item-subtitle>{{ episode.title }} </v-list-item-subtitle>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
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
  name: "TvSeriesList",
  data() {
    return {
      response: null,
      watchedList: null,
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
    watched(event, id) {
      this.refreshAuth();
      if (!this.auth) {
        this.unauthorized();
        return;
      }
      const authstr = "Bearer " + this.auth.jwt;
      axios
              .put(
                      "https://tv-series-ssi.herokuapp.com/api/users/" + this.auth.idUser + "/episodes/" + id, "",
                      {
                        headers: {
                          Authorization: authstr
                        }
                      }
              )
              .then(response => {
                if (response.status === 200) {
                    event.target.classList.remove("mdi-checkbox-blank");
                    event.target.classList.add("mdi-checkbox-marked");
                }
              });
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
          "https://tv-series-ssi.herokuapp.com/api/tvseries/" +
            this.$route.params.id,
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
      axios
            .get(
                    "https://tv-series-ssi.herokuapp.com/api/users/" + this.auth.idUser + "/episodes/",
                    {
                      headers: {
                        Authorization: authstr
                      }
                    }
            )
            .then(response => {
              this.watchedList = response.data;
              console.log(this.watchedList);
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
