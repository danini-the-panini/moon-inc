<template>
  <Sprite
    :x="x"
    :y="y"
    :width="48"
    :height="48"
    :orientation="orientation"
    :selected="selected"
    :image="image"
  />
</template>

<script lang="ts">
import Sprite from '@/components/Sprite.vue';
import * as Buggy from '@/assets/buggy.png';

export default {
  components: { Sprite },
  props: {
    selected: Boolean,
    x: Number,
    y: Number,
    orientation: Number,
  },
  setup() {
    return {
      image: Buggy,
    };
  },
};
</script>
