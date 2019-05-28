<template>
    <v-layout v-if="teams" align-center justify-center row>
        <v-flex xs12 sm6>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-icon>sports_soccer</v-icon>

                    <v-toolbar-title>Teams</v-toolbar-title>
                </v-toolbar>
                <v-list two-line>
                    <template v-for="(team, index) in teams.data">

                        <v-list-tile
                                :key="index"
                                avatar
                                @click="someAction(team.id)"
                        >
                            <v-list-tile-avatar>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="team.name"></v-list-tile-title>
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
    name: 'HomeComponent',
    methods: {
        someAction(teamId) {
            this.$router.push({name: 'team', params: { id: teamId }});
        }
    },
    apollo: {
        teams: {
            query: gql`query GetTeams($count: Int!) {
              teams(count: $count) {
                data {
                  id
                  name
                  players {
                    id
                    name
                  }
                }
                paginatorInfo {
                  currentPage
                  lastPage
                }
              }
            }`,
            variables: {
                count: 35
            }
        }
    },
}
</script>

<style>

</style>
