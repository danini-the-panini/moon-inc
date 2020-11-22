<template>
  <div class="overlay">
    <div class="bar" :style="barStyle"></div>
  </div>
</template>

<script lang="ts">
import StoringSystem from '@/systems/StoringSystem';
import { computed } from 'vue';

export default {
  props: {
    system: StoringSystem,
  },
  setup(props: {
    system: StoringSystem;
  }) {
    const barStyle = computed(() => ({
      width: `${(props.system.stored / props.system.capacity) * 100}%`,
    }));

    return {
      barStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  height: 0.5rem;
}

.bar {
  height: 100%;
  background-color: #ff0000;
}
</style>
