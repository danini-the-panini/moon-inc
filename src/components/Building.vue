<template>
  <Sprite
    :x="x"
    :y="y"
    :width="256"
    :height="256"
    :orientation="0"
    :selected="selected"
    :image="image"
  />
</template>

<script lang="ts">
import Sprite from '@/components/Sprite.vue';
import * as Powerplant from '@/assets/powerplant.png';

export default {
  components: { Sprite },
  props: {
    selected: Boolean,
    x: Number,
    y: Number,
  },
  setup() {
    return {
      image: Powerplant,
    };
  },
};
</script>
