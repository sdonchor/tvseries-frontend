<template>
    <div>
        <p>tvseries</p>
        <p>id = {{ $route.params.id }}</p>
        <div>
            <code>
                {{ response }}
            </code>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "TvSeriesList",
        data() {
            return {
                response: 'loading...'
            }
        },
        mounted() {
            axios
                .get('https://tv-series-ssi.herokuapp.com/api/tvseries/1', { headers: { 'Access-Control-Allow-Origin': '*' } })
                .then(response => {
                    this.response = JSON.stringify(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>

<style scoped>

</style>