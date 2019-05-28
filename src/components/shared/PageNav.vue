<template>
    <span>
        <v-navigation-drawer
                clipped
                fixed
                v-model="drawer"
                app
        >
            <v-list>
                <v-list-tile :to="{name: 'home'}">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="{name: 'teams.home'}">
                    <v-list-tile-action>
                        <v-icon>view_list</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Teams</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="{name: 'addResult'}">
                    <v-list-tile-action>
                        <v-icon>library_add</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Add result</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-img contain height="40" :src="require('@/assets/pes.png')"></v-img>
            <v-toolbar-title>PES Stats</v-toolbar-title>
        </v-toolbar>
    </span>
</template>

<script>
export default {
    name: 'PageNav',
    data() {
        return {
            drawer: false
        }
    }
};
</script>

<style>

</style>