<template>
    <v-layout v-if="players" align-center justify-center row>
        <v-flex xs12 sm6>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-icon>sports_soccer</v-icon>

                    <v-toolbar-title>Jugadores</v-toolbar-title>
                </v-toolbar>
                <v-list two-line>
                    <template v-for="(player, index) in players.data">

                        <v-list-tile
                                :key="index"
                                avatar
                                :to="{name: 'players.player', params: {id: player.id}}"
                        >
                            <v-list-tile-avatar>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="player.name"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: 'TeamsComponent',
    data() {
        return {
            loader: null
        };
    },
    methods: {
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
        players: {
            query: gql`query GetPlayers($count: Int!) {
              players(count: $count) {
                data {
                  id
                  name
                }
              }
            }`,
            variables: {
                count: 50
            }
        }
    },
}
</script>

<style>

</style>
