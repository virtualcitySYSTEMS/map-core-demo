<template>
  <div
    :id="id" :class="classes"
    @mouseenter="mouseEnter"
  />
</template>

<script>
  export default {
    name: 'MapComponent',
    props: {
      id: {
        type: String,
        required: true,
      },
      small: {
        type: Boolean,
        default: false,
      },
      large: {
        type: Boolean,
        default: false,
      },
      position: {
        type: String,
        required: true,
      },
    },
    computed: {
      classes() {
        const classes = ['map_container'];
        if (this.small) {
          classes.push('small');
        } else if (this.large) {
          classes.push('large');
        } else {
          classes.push(this.position);
        }

        return classes;
      },
    },
    methods: {
      mouseEnter() {
        if (!this.small) {
          this.$emit('focus');
        }
      },
    },
  };
</script>


<style lang="scss" scoped>

  .map_container {
    position: absolute;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 8 8'%3E%3Cg fill='%23acacac' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
    font-family: Arial, sans-serif;
    font-size: 0.9rem;
  }

  .map_container.left {
    left: 0;
    right: 48%;
    bottom: 0;
    top: 0;
  }

  .map_container.right {
    left: 52%;
    right: 0;
    bottom: 0;
    top: 0;
  }

  .map_container.large {
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  .map_container.small {
    right: 1rem;
    top: 1rem;
    width: 24rem;
    height: 12rem;
    z-index: 2;
  }

  ::v-deep {
    .mapElement {
      height: 100%;
      overflow: hidden; /* Fix for iFrame content */
    }

    .cesium-widget {
      height: 100%;
      width: 100%;
      position: relative;
    }

    .cesium-widget canvas{
      overflow: hidden;
      height: 100%; /* very fucking irritating at 100% the canvas grows */
      width: 100%;
      touch-action: none;
    }
  }



</style>
