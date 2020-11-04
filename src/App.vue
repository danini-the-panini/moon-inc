<template>
  <game/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Game from './components/Game.vue';

export default defineComponent({
  name: 'App',
  components: {
    Game,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
