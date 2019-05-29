<template>
    <v-container grid-list-xl>
        <v-layout
                flex-child
                wrap
        >
            <v-flex xs12 sm4 md3 v-for="(team, index) in stats" :key="index">
                <v-card :color="getRandomColor()" :to="{name: 'teams.team', params: {id: team.team_id}}">
                    <v-card-title><h2>{{index}}</h2></v-card-title>

                    <v-card-text>
                        <v-chip label small color="blue">WIN % {{team.avg}}</v-chip>
                        <v-chip label small color="green">RECORD {{team.record}}</v-chip>
                        <v-chip label small color="orange">DIFF {{team.difference}}</v-chip>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: 'TeamStatsComponent',
    data() {
        return {
            loader: null
        };
    },
    methods: {
        getRandomColor() {
            const c = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
            'teal', 'amber', 'orange', 'deep-orange'];

            return c[Math.floor(Math.random()*c.length)] + ' darken-4';
        }
    },
    watch: {
        '$apollo.loading': function (data) {
            if (data) {
                this.loader = this.$loading.show();
            } else {
                this.loader.hide();
            }

        }
    },
    apollo: {
        stats: {
            query: gql`query GetStats($start_at: Date, $end_at: Date) {
              stats(start_at: $start_at, end_at: $end_at)
            }`,
            variables: {
                start_at: '',
                end_at: ''
            }
        }
    }
}
</script>

<style>

</style>