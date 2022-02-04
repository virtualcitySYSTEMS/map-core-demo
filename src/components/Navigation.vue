<template>
  <div class="compass-container">
    <v-sheet
      color="primary"
      class="d-flex justify-center compass rounded-circle mb-4 transition-transform-200-ease"
      title="Go to start view."
      @click="goHome"
    >
      <v-icon>
        mdi-home
      </v-icon>
    </v-sheet>
    <v-sheet
      :color="infoToolActive ? 'secondary' : 'primary'"
      class="d-flex justify-center compass rounded-circle mb-4 transition-transform-200-ease"
      @click="toggleInfoTool"
      title="Info tool. Click a Building or footprint for info"
    >
      <v-icon>
        mdi-information
      </v-icon>
    </v-sheet>
    <v-sheet
      :color="declarativeActive ? 'secondary' : 'primary'"
      class="d-flex justify-center compass rounded-circle mb-4 transition-transform-200-ease"
      title="Highlight buildings by function."
      @click="togglePalette"
    >
      <v-icon>
        mdi-palette
      </v-icon>
    </v-sheet>
    <v-sheet
      :color="planningActive ? 'secondary' : 'primary'"
      class="d-flex justify-center compass rounded-circle mb-4 transition-transform-200-ease"
      title="Show and zoom to a fictional planning scenario."
      @click="togglePlanning"
    >
      <v-icon>
        mdi-home-city
      </v-icon>
    </v-sheet>
    <v-sheet
      :style="{
      transform: `rotate(${heading}deg)`,
    }"
      color="primary"
      class="d-flex justify-center compass rounded-circle mb-4 transition-transform-200-ease"
      title="Orient north"
      @click="orientNorth"
    >
      <v-icon>
        mdi-arrow-up
      </v-icon>
    </v-sheet>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    data() {
      return {
        heading: 0,
        infoToolActive: false,
        declarativeActive: false,
        planningActive: false,
      };
    },
    created() {
      const { synchronizer } = window.vcs.context;
      this.heading = synchronizer.currentVP.heading;
      this.listener = window.vcs.context.synchronizer.vpChanged.addEventListener(({ heading }) => {
        this.heading = heading;
      });
      this._orientNorth = () => {
        const currentVP = synchronizer.currentVP.clone();
        currentVP.heading = 0;
        synchronizer.currentMap.gotoViewPoint(currentVP);
      };
      this._goHome = () => {
        synchronizer.currentMap.gotoViewPoint(window.vcs.context.startingVP);
      }
    },
    methods: {
      orientNorth() {
        this._orientNorth();
      },
      goHome() {
        this._goHome();
      },
      toggleInfoTool() {
        if (this.infoToolActive) {
          this.infoToolActive = false;
          vcs.context.infoTool.deactivate();
        } else {
          this.infoToolActive = true;
          vcs.context.infoTool.activate();
        }
      },
      togglePalette() {
        if (this.declarativeActive) {
          this.declarativeActive = false;
          vcs.context.infoTool.setDefaultStyle();
        } else {
          this.declarativeActive = true;
          vcs.context.infoTool.setDeclarativeStyle();
        }
      },
      togglePlanning() {
        if (this.planningActive) {
          this.planningActive = false;
          vcs.context.planning.deactivate();
        } else {
          this.planningActive = true;
          vcs.context.planning.activate();
        }
      }
    },
    destroyed() {
      this.listener();
    },
  };
</script>
<style scoped>
  .compass {
    height: 42px;
    width: 42px;
    cursor: pointer;
  }

  .compass-container {
    position: absolute;
    right: 24px;
    bottom: 24px;
  }
</style>
