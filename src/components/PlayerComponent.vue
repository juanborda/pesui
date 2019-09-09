<template>
    <v-layout v-if="player" align-center justify-center row>
        <v-flex xs12 sm6>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-icon>sports_soccer</v-icon>
                    <v-toolbar-title>{{player.name}}</v-toolbar-title>
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
                                            <v-card-text class="px-0 display-3">{{playerStats.avg}}</v-card-text>
                                        </v-card>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-card dark color="teal accent-4">
                                            <v-card-title primary-title>
                                                <div class="headline">Record (G-E-P)</div>
                                            </v-card-title>
                                            <v-card-text class="px-0 display-3">{{playerStats.record}}</v-card-text>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                    </v-flex>
                </v-layout>

                <!--<pre>
                    {{teamStats}}
                </pre>-->

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-list two-line="">
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        En total...
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <v-chip label color="orange">{{playerStats.games}} partidos</v-chip>
                                        <v-chip label color="green">{{playerStats.win}} ganados</v-chip>
                                        <v-chip label color="blue">{{playerStats.draw}} empatados</v-chip>
                                        <v-chip label color="red">{{playerStats.lost}} perdidos</v-chip>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>

                <TeamResultsComponent :results="playerStats.results"></TeamResultsComponent>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import gql from 'graphql-tag';
import TeamResultsComponent from "@/components/TeamResultsComponent";

export default {
    name: 'TeamComponent',
    components: {TeamResultsComponent},
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
            player: null,
            playerStats: null,
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
    computed: {
        playerId() {
            return this.$route.params.id
        }
    },
    apollo: {
        player: {
            query: gql`query GetPlayer($id: Int) {
                  player(id: $id) {
                    id,
                    name
                  },
                  playerStats(id: $id)
            }`,
            variables() {
                return {
                    id: this.playerId
                }
            },
            result(res) {
                this.player = res.data.player;
                this.playerStats = res.data.playerStats
            }
        }
    }
}
</script>

<style scoped>

</style>
