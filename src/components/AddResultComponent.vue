<template>
    <v-form xs12>
        <v-container fluid grid-list-xl>
            <v-layout wrap align-center justify-center>
                <v-flex xs12 sm4>
                    <v-toolbar color="teal">
                        <v-autocomplete
                                box flat
                                v-model="result.teamA"
                                :items="items"
                                item-text="name"
                                item-value="id"
                                solo-inverted
                                class="mx-3"
                        ></v-autocomplete>
                            <v-text-field
                                          flat
                                          mask="#"
                                          solo-inverted
                                          v-model="result.teamAScore"
                            ></v-text-field>
                    </v-toolbar>
                </v-flex>

                <v-flex xs12 sm4>
                    <v-toolbar color="teal">
                        <v-text-field
                                      flat
                                      mask="#"
                                      solo-inverted
                                      v-model="result.teamBScore"
                        ></v-text-field>
                        <v-autocomplete
                                box flat
                                v-model="result.teamB"
                                :items="items"
                                item-text="name"
                                item-value="id"
                                solo-inverted
                                class="mx-3"
                                :disabled="!result.teamA"
                        ></v-autocomplete>

                    </v-toolbar>
                </v-flex>
                <v-flex xs12 text-xs-center>
                    <v-btn color="green" large @click="submit()">SAVE</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
import gql from 'graphql-tag'
export default {
    name: 'AddResultComponent',
    data() {
        return {
            result: {
                teamA: null,
                teamB: null,
                teamAScore: null,
                teamBScore: null
            },
            loader: null
        };
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
    methods: {
        submit() {
            const result = this.result;
            const teamA = this.items.find((item) => item.id === this.result.teamA).name.split('-');
            const teamB = this.items.find((item) => item.id === this.result.teamB).name.split('-');
            const dupes = this.lodash.intersection(teamA, teamB);

            if (dupes.length) {
                return;
            }

            this.$apollo.mutate({
                mutation: gql`mutation CreateGame(
                  $team_home_id: Int!,
                  $team_away_id: Int!,
                  $team_home_score: Int!,
                  $team_away_score: Int!
                ) {
                  createGame(
                    team_home_id: $team_home_id,
                  \tteam_away_id: $team_away_id,
                    team_home_score: $team_home_score,
                    team_away_score: $team_away_score
                  ) {
                    id
                    team_home {
                      name
                    }
                    team_away {
                      name
                    }
                    team_home_score
                    team_away_score
                    result
                  }
                }`,
                variables: {
                    team_home_id: result.teamA,
                    team_away_id: result.teamB,
                    team_home_score: Number(result.teamAScore),
                    team_away_score: Number(result.teamBScore)
                }
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            }) ;
            console.log('clicked', this.result);
        }
    },
    computed: {
        items() {
            return this.teams ? this.teams : [];
        }
    },
    apollo: {
        teams: {
            query: gql`query GetTeams($count: Int!) {
              teams(count: $count) {
                data {
                  id
                  name
                }
              }
            }`,
            variables: {
                count: 50
            },
            result(res) {
                this.teams = res.data.teams.data;

            }
        }
    }
}
</script>

<style>

</style>