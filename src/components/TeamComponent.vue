<template>
    <v-layout v-if="team" align-center justify-center row>
        <v-flex xs12 sm6>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-icon>sports_soccer</v-icon>
                    <v-toolbar-title>{{team.name}}</v-toolbar-title>
                </v-toolbar>

                <v-layout justify-center fill>
                    <v-flex xs12>
                            <v-container
                                    fluid
                                    grid-list-md
                                    text-xs-center
                            >
                                <v-layout row wrap>
                                    <v-flex xs6>
                                        <v-card dark color="teal accent-4">
                                            <v-card-title primary-title>
                                                <div class="headline">Gana...</div>
                                            </v-card-title>
                                            <v-card-text class="px-0 display-3">{{teamStats.average}}</v-card-text>
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-card dark color="teal accent-4">
                                            <v-card-title primary-title>
                                                <div class="headline">Record (G-E-P)</div>
                                            </v-card-title>
                                            <v-card-text class="px-0 display-3">{{teamStats.record}}</v-card-text>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                    </v-flex>
                </v-layout>

                <!--<pre>
                    {{teamStats}}
                </pre>-->

                <v-list two-line="">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                En total...
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-chip label color="orange">Jugó {{teamStats.global.games}} partidos</v-chip>
                                <v-chip label color="green">Ganó {{teamStats.global.win}} partidos</v-chip>
                                <v-chip label color="blue">Empató {{teamStats.global.draw}} partidos</v-chip>
                                <v-chip label color="red">Perdió {{teamStats.global.lost}} partidos</v-chip>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                De local {{teamStats.home.games}}
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-chip label>{{teamStats.home.win}} ganados</v-chip>
                                <v-chip label>{{teamStats.home.draw}} empatados</v-chip>
                                <v-chip label>{{teamStats.home.lost}} perdidos</v-chip>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>

                        <v-list-tile-content>
                            <v-list-tile-title>
                                De visitante {{teamStats.away.games}}
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-chip label>{{teamStats.away.win}} ganados</v-chip>
                                <v-chip label>{{teamStats.away.draw}} empatados</v-chip>
                                <v-chip label>{{teamStats.away.lost}} perdidos</v-chip>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>

                <v-list two-line>
                    <v-list-group>
                        <template v-slot:activator>
                            <v-list-tile color="red">
                                <v-list-tile-content>
                                    <v-list-tile-title>Ultimos partidos..</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                        <template v-for="(result, index) in team.results">
                            <v-list-tile
                                    :key="index"
                                    avatar
                                    @click=""
                            >
                                <v-list-tile-avatar>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title v-html="result"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider :key="result+index"></v-divider>
                        </template>
                    </v-list-group>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: 'TeamComponent',
    data () {
        return {
            headers: [
                {
                    text: 'Match',
                    align: 'center',
                    sortable: false,
                    //value: 'name'
                }
            ],
            team: null,
            teamStats: null
        };
    },
    computed: {
        teamId() {
            return this.$route.params.id
        }
    },
    apollo: {
        team: {
            query: gql`query GetTeam($id: Int) {
                  team(id: $id) {
                    name
                    results
                  }
                  teamStats(id: $id)
            }`,
            variables() {
                return {
                    id: this.teamId
                }
            },
            result(res) {
                this.team = res.data.team;
                this.teamStats = res.data.teamStats
            }
        }
    }
}
</script>

<style scoped>

</style>