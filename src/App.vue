<template>
  <v-app>
    <v-app-bar
      app
      color="accent"
      elevation="3"
    >
      <div class="d-flex align-center justify-center mr-2">
        <v-btn-toggle v-model="view" class="mr-4">
          <v-btn color="primary" title="Focus on 3D View">3D</v-btn>
          <v-btn color="primary" title="Side-by-side View"><v-icon :color="view === 1 ? 'black' : 'white'">mdi-arrow-split-vertical</v-icon></v-btn>
          <v-btn color="primary" title="Focus on 2D View">2D</v-btn>
        </v-btn-toggle>
      </div>
      <div class="d-flex align-center">
        <span class="headline">
          vcMAP Core Demo
        </span>
      </div>
      <v-spacer />
      <div class="d-flex align-center">
        <v-btn-toggle>
          <v-btn href="https://vc.systems" target="_blank" icon :value="null" class="no-active">
            <img src="../assets/favicon.png" alt="logo" height="32px"/>
          </v-btn>
          <v-btn href="https://github.com/virtualcitySYSTEMS/map-core" target="_blank" icon class="no-active">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="h-full container" :fluid="true">
        <Map @focus="setFocusedMap(true)" id="target-3D" :small="view === 2" :large="view === 0" position="left"/>
        <Map @focus="setFocusedMap()" id="target-2D" :small="view === 0" :large="view === 2" position="right"/>
      </v-container>
      <Navigation v-if="rendering"/>
      <InfoTool v-if="rendering" />
    </v-main>
    <v-footer>
      <span>
        <a href="https://www.openstreetmap.org" target="_blank">© OpenStreetMap Contributors 2022</a> |
        <a href="https://gds.hessen.de">© Landesvermessungsamt Hessen 2022</a>
      </span>
      <v-spacer />
      <span>
        <span class="primary--text">Open Source Software</span> made with <v-icon>mdi-heart</v-icon> by <a href="https://vc.systems">vcs</a> in Berlin
      </span>
    </v-footer>
  </v-app>
</template>

<script>
  import MapComponent from './components/Map.vue';
  import Navigation from './components/Navigation.vue';
  import setup from './api/api.js';
  import InfoTool from './components/InfoTool.vue';

  export default {
    name: 'App',
    components: {
      InfoTool,
      Map: MapComponent,
      Navigation,
    },
    data() {
      return {
        rendering: false,
        view: 1,
        null: 1,
      };
    },
    watch: {
      view() {
        this.$nextTick(() => {
          window.vcs.context.mapCollection2D.activeMap.olMap.updateSize();
        });
      },
    },
    async mounted() {
      const context = await setup();
      this._setFocusedMap = (is3D) => {
        if (is3D) {
          context.synchronizer.setFocusedMap(context.mapCollection3D.activeMap);
        } else {
          context.synchronizer.setFocusedMap(context.mapCollection2D.activeMap);
        }
      };
      this.rendering = true;
    },
    methods: {
      setFocusedMap(is3D) {
        this._setFocusedMap(is3D)
      },
    },
  };
</script>

<style scoped>
  .h-full {
    height: 100%;
  }

  .container {
    margin: 0;
    padding: 0;
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .v-btn--active.no-active::before {
    opacity: 0 !important;
  }

</style>
