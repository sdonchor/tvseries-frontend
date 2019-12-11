<template>
  <div>
    <p>tvserieslist</p>
    <button @click = "getAllSeries">pobierz wszystkie</button>
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
          headers: { "Access-Control-Allow-Origin": "*" }
        })
        .then(response => {
          this.serieslist = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    $route(to, from) {
        this.getAllSeries()
    }
  }
};
</script>

<style scoped></style>
