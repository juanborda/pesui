<template>
    <v-expansion-panel>
        <v-expansion-panel-content>
            <template v-slot:header>
                <div>Ultimos partidos..</div>
            </template>
            <v-card>
                <v-container
                        fluid
                        grid-list-lg
                >
                    <v-layout row wrap>
                        <v-flex xs12 v-for="(res,index) in result" :key="index">
                            <v-card>
                                <v-layout row wrap flex>
                                    <v-flex xs12 md3>
                                        <v-chip label color="teal">{{res.date}}</v-chip>
                                    </v-flex>
                                    <v-flex xs12 md9>
                                        <v-flex xs12 md6>
                                            <v-chip label color="indigo lighten-2">{{res.home_team_score}}</v-chip>
                                            <v-chip label color="indigo">{{res.home_team}}</v-chip>
                                        </v-flex>
                                        <v-flex xs12 md6>
                                            <v-chip label color="purple lighten-2">{{res.away_team_score}}</v-chip>
                                            <v-chip label color="purple">{{res.away_team}}</v-chip>
                                        </v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
    name: 'TeamResultsComponent',
    props: ['results'],
    computed: {
        result() {
            let res = this.results.map((r) => {
                const date = r.match(/\(.*\)/gi)[0].replace(/\(|\)/gi,''),
                    arr = r.split(' '),
                    score = arr[1].split('-'),
                    home_team = arr[0],
                    away_team = arr[2];

                return {
                    date,
                    home_team,
                    away_team,
                    home_team_score: score[0],
                    away_team_score: score[1]
                };

            });
            return res;
        }
    }
}
</script>

<style>

</style>