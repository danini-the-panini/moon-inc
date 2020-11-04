<template>
  <div class="game">
    <header>
      <h1>Moon Inc</h1>
    </header>
    <main>
      <div class="left-sidebar"></div>
      <div class="map"></div>
      <div class="right-sidebar"></div>
    </main>
    <footer>
      © 2020 sourlemon {&gt;.&lt;}
    </footer>
  </div>
</template>

<script lang="ts">
export default {
};
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  height: 3rem;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
}

h1 {
  margin: 0;
  padding: 0;
}

footer {
  height: 2rem;
  border-top: 1px solid black;
  display: flex;
  align-items: center;
}

main {
  display: flex;
  width: 100%;
  flex-grow: 1;
}

.map {
  flex-grow: 1;
  background-image: url('../assets/lunarrock_d.png');
}

.left-sidebar, .right-sidebar {
  width: 20rem;
}

.left-sidebar {
  border-right: 1px solid black;
}

.right-sidebar {
  border-left: 1px solid black;
}
</style>
