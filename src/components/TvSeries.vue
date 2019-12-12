<template>
  <div>
    <div v-if="response">
        <h1>{{response.title ? response.title : "brak tytułu"}}</h1>
        <img alt="plakat" :src="response.imageurl"/>
        <p>{{response.description === "[null]" ? "" : response.description.substr(1, response.description.length - 2) }}</p>
        <p class="font-italic font-weight-bold">{{response.genres}}</p>
        <p>Liczba sezonów: <span class="font-weight-bold">{{response.numberOfSeasons ? response.numberOfSeasons : 1 }}</span></p>
        <div v-if="response.setOfEpisodes.length > 0">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>Lista odcinków</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-list-item v-for="episode in response.setOfEpisodes">
                            <v-list-item-title class="font-weight-bold">s{{episode.season}}e{{episode.episodeNumber}}</v-list-item-title>
                            <v-list-item-subtitle>{{episode.title}}</v-list-item-subtitle>
                        </v-list-item>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
      <div v-else>
        ładowanie...
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TvSeriesList",
  data() {
    return {
      response: null
    };
  },
    mounted() {
        axios
            .get('https://tv-series-ssi.herokuapp.com/api/tvseries/' + this.$route.params.id, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(response => {
                this.response = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>

<style scoped></style>
