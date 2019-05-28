<template>
  <v-app dark>
    <PageNav></PageNav>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <PageFooter></PageFooter>
  </v-app>
</template>

<script>

import PageNav from "./components/shared/PageNav";
import PageFooter from "./components/shared/PageFooter";
export default {
  data() {
    return {
      drawer: false
    };
  },
  name: 'App',
  components: {PageFooter, PageNav }
}
</script>
