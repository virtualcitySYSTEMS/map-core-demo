<template>
  <v-sheet
    v-if="hasFeature || hasStyle"
    class="info-tool pa-2"
  >
    <v-card
      v-if="hasFeature"
      elevation="5"
      class="mb-2"
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-group>
            <v-list-item-title>
              {{ gmlId }}
            </v-list-item-title>
            <v-list-item-subtitle>
              GML ID
            </v-list-item-subtitle>
          </v-list-item-group>
        </v-list-item>
        <v-list-item>
          <v-list-item-group>
            <v-list-item-title>
              {{ functionType }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Building Function
            </v-list-item-subtitle>
          </v-list-item-group>
        </v-list-item>
        <v-list-item v-if="roofType">
          <v-list-item-group>
            <v-list-item-title>
              {{ roofType }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Roof Type
            </v-list-item-subtitle>
          </v-list-item-group>
        </v-list-item>
      </v-list>
    </v-card>
    <v-card
      v-if="hasStyle"
      elevation="5"
    >
      <v-list dense>
        <v-list-item>
          <v-chip
            color="accent"
            text-color="gray"
            dark
          >
            Wohngebäude
          </v-chip>
        </v-list-item>
        <v-list-item>
          <v-chip
            color="warning"
            text-color="gray"
          >
            Gewerbe
          </v-chip>
        </v-list-item>
        <v-list-item>
          <v-chip
            color="info"
            text-color="gray"
          >
            Öffentlich
          </v-chip>
        </v-list-item>
        <v-list-item>
          <v-chip
            color="primary"
            text-color="gray"
          >
            Selektiert
          </v-chip>
        </v-list-item>
      </v-list>
    </v-card>
  </v-sheet>
</template>

<script>
  export default {
    name: 'InfoTool',
    data() {
      return {
        hasFeature: false,
        hasStyle: false,
        roofType: null,
        functionType: null,
        gmlId: null,
      };
    },
    created() {
      const { infoTool } = vcs.context;
      this.listeners = [];
      this.listeners.push(infoTool.featureClicked.addEventListener((feature) => {
        if (feature) {
          const attributes = feature.getProperty('attributes');
          this.roofType = attributes.roofType;
          this.functionType = attributes.function;
          this.gmlId = attributes.gmlid || feature.getId();
          this.hasFeature = true;
        } else {
          this.hasFeature = false;
        }
      }));

      this.listeners.push(infoTool.declarativeStyleSet.addEventListener((set) => {
        this.hasStyle = set;
      }));

    },
    destroyed() {
      this.listeners.forEach((cb) => { cb(); });
      this.listeners = [];
    }
  };
</script>

<style scoped>
  .info-tool {
    position: absolute;
    bottom: 24px;
    right: 80px;
  }
</style>
