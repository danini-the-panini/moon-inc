<template>
  <div class="game">
    <header>
      <h1>Moon Inc</h1>
    </header>
    <main>
      <div class="left-sidebar"></div>
      <div
        class="map"
        @click.left.stop="clickMap"
        @click.right.stop.prevent="actionMap"
      >
        <Vehicle
          :x="vehicle.x"
          :y="vehicle.y"
          :orientation="vehicle.orientation"
          :selected="vehicle.id === selectedVehicleId"
          @click.left.stop="selectVehicle"
        />
      </div>
      <div class="right-sidebar"></div>
    </main>
    <footer>
      © 2020 sourlemon {&gt;.&lt;}
    </footer>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  ref,
} from 'vue';
import Vehicle from '@/components/Vehicle.vue';
import rad2deg from '@/functions/rad2deg';

interface Vehicleish {
  id: number;
  x: number;
  y: number;
  orientation: number;
}

export default {
  components: {
    Vehicle,
  },
  setup() {
    const vehicle = reactive({
      id: 1,
      x: 100,
      y: 200,
      orientation: 30,
    });

    const selectedVehicleId = ref(-1);

    const selectVehicle = () => {
      selectedVehicleId.value = vehicle.id;
    };

    const clickMap = () => {
      selectedVehicleId.value = -1;
    };

    const actionMap = (event: MouseEvent) => {
      if (selectedVehicleId.value !== -1) {
        const dx = event.offsetX - vehicle.x;
        const dy = event.offsetY - vehicle.y;

        vehicle.orientation = rad2deg(Math.atan2(-dx, dy));
        vehicle.x = event.offsetX;
        vehicle.y = event.offsetY;
      }
    };

    return {
      vehicle,
      selectVehicle,
      selectedVehicleId,
      clickMap,
      actionMap,
    };
  },
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
  position: relative;
}

.vehicle {
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
