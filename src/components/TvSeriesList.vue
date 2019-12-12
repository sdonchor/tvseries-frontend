<template>
  <div>
    <h1>Lista seriali</h1>
    <div v-if="serieslist">
      <v-list-item :key="idx" v-for="(show, idx) in serieslist">
        <v-list-item-title
          class="font-weight-bold"
          @click.stop="goto(show.idTvSeries)"
          >{{ show.title ? show.title : "brak tytułu" }}</v-list-item-title
        >
        <v-list-item-subtitle>{{
          show.description === "[null]"
            ? ""
            : show.description.substr(1, show.description.length - 1)
        }}</v-list-item-subtitle>
      </v-list-item>
    </div>
    <div v-else>
      <p>{{ loadmessage }}</p>
    </div>
  </div>
</template>

<script>
import authdata from "../authdata";
export default {
  name: "TvSeriesList",
  data: function() {
    return {
      serieslist: null,
      auth: authdata.auth,
      loadmessage: "Ładowanie..."
    };
  },
  methods: {
    goto(id) {
      const path = "series/" + id;
      this.$router.push(path);
    },
    refreshAuth() {
      this.auth = authdata.auth;
    },
    getAllSeries() {
      this.refreshAuth();
      if (!this.auth) {
        this.loadmessage = "Zawartość dostępna dla zalogowanych użytkowników.";
        return;
      }
      const authstr = "Bearer " + this.auth.jwt;
      axios
        .get("https://tv-series-ssi.herokuapp.com/api/tvseries", {
          headers: {
            Authorization: authstr
          }
        })
        .then(response => {
          this.serieslist = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getAllSeries();
  }
};
</script>

<style scoped></style>
