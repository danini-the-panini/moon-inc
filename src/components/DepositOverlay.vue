<template>
  <div class="overlay">
    <span class="value">{{value}}</span>
  </div>
</template>

<script lang="ts">
import DepositSystem from '@/systems/DepositSystem';
import { computed } from 'vue';

export default {
  props: {
    system: DepositSystem,
  },
  setup(props: {
    system: DepositSystem;
  }) {
    const value = computed(() => Math.round(props.system.value));

    return {
      value,
    };
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  height: 0.5rem;
}

.value {
  background-color: black;
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
