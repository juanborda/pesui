<template>
  <v-layout align-center justify-center column>
    <v-layout v-if="players" column xs12>
      <v-flex xs12 class="ma-2" v-for="item in [0,1,2]" :key="item">
        <v-btn-toggle v-model="selectedPlayers" multiple light  >
          <v-btn large :value="player.name" flat v-for="(player, index) in players.data.slice(players.data.length/3*item, (players.data.length/3*item)+players.data.length/3)" :key="index" color="primary" dark>
            <v-icon>account_circle</v-icon>
            <span>{{player.name}}</span>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>

    <v-layout row wrap align-center xs12>
      <v-flex xs12>
        <v-btn block large @click="sortear()">Sortear</v-btn>
      </v-flex>
    </v-layout>

    <v-layout v-if="teams" row xs12>
      <v-flex xs4 v-for="(team, idx) in teams" :key="idx">
        <v-card >
          <v-card-title>Equipo {{Number(idx)+1}}</v-card-title>
          <v-card-text>
            <v-chip color="primary">{{team[0]}}</v-chip>
            <v-chip color="info">{{team[1]}}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <v-snackbar
      v-model="snackbar"
      bottom
      dark
      color="error"
    >
      {{ snackbarText }}
      <v-btn
        color="black"
        flat
        @click="snackbar = false, snackbarText = ''"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
    data() {
        return {
          selectedPlayers: ['Luciano', 'Juan', 'Fabian', 'Horacio', 'Martin', 'Pablo H', 'Guasti', 'Gabriel'],
          loader: null,
          snackbar: false,
          snackbarText: '',
          currentAvailablePlayers: [],
          teams: {}
        };
    },
    methods: {
      sortear () {
        let player1, player2
        const numTeams = this.selectedPlayers.length / 2

        if (!this.selectedPlayers.length) {
          this.snackbarText = 'Elige jugadores!'
          return this.snackbar = true
        }
        if (this.selectedPlayers.length % 2) {
          this.snackbarText = 'La cantidad de jugadores no es par!'
          return this.snackbar = true
        }

        if (numTeams < 2) {
          this.snackbarText = 'Se necesitan al menos jugadores para 2 equipos!'
          return this.snackbar = true
        }

        this.teams = {}
        this.currentAvailablePlayers = [...this.selectedPlayers]

        for (let i = 0; i < numTeams; i++) {
          player1 = this.getRandomPlayer()
          player2 = this.getRandomPlayer()
          this.teams[i] = [player1, player2]
        }
      },
      getRandomPlayer () {
        if (this.currentAvailablePlayers.length === 1) {
          return this.currentAvailablePlayers[0]
        }
        const idx = Math.floor(Math.random()*this.currentAvailablePlayers.length)
        const player = this.currentAvailablePlayers[idx];

        this.currentAvailablePlayers.splice(idx, 1)
        return player
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
