<template>
  <div
    :class="{ container: true, selected: selected }"
    :style="containerStyle">
    <div class="image" :style="imageStyle"></div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  props: {
    selected: Boolean,
    x: Number,
    y: Number,
    orientation: Number,
  },
  setup(props: { selected: boolean; x: number; y: number; orientation: number }) {
    const containerStyle = computed(() => ({
      transform: `translate(-50%, -50%) translate(${props.x}px, ${props.y}px)`,
    }));

    const imageStyle = computed(() => ({
      transform: `rotate(${props.orientation}deg)`,
    }));

    return {
      containerStyle,
      imageStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 4rem;
  height: 4rem;
  position: relative;

  &.selected {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      outline: 2px solid magenta;
    }
  }
}

.image {
  background-image: url('../assets/trashmaster.png');
  display: block;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  position: absolute;
}
</style>
