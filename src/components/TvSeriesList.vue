<template>
  <div>
      <h1>Lista seriali</h1>
      <div v-if="serieslist">
          <v-list-item :key="idx" v-for="(show,idx) in serieslist">
              <v-list-item-title class="font-weight-bold"><a :href="'series/'+show.idTvSeries">{{ show.title ? show.title : "brak tytułu" }}</a></v-list-item-title>
              <v-list-item-subtitle>{{show.description === "[null]" ? "" : show.description.substr(1, show.description.length-1) }}</v-list-item-subtitle>
          </v-list-item>
      </div>
      <div v-else><p>ładowanie...</p></div>
  </div>
</template>

<script>
export default {
  name: "TvSeriesList",
  data: function() {
    return {
      serieslist: null
    };
  },
  methods: {
    getAllSeries() {
      axios
        .get("https://tv-series-ssi.herokuapp.com/api/tvseries", {
          headers: { "access-control-allow-origin": "*" }
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
