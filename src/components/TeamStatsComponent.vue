<template>
    <v-container grid-list-xl>
        <v-layout
                flex-child
                wrap
        >
            <v-flex v-for="(team, index) in stats" :key="index" xs2>
                <v-card color="cyan darken-4">
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