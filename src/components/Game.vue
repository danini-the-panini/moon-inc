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
          :selected="vehicle.id === selectedEntityId"
          @click.left.stop="selectVehicle"
        />
        <Building
          :x="building.x"
          :y="building.y"
          :selected="building.id === selectedEntityId"
          @click.left.stop="selectBuilding"
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
  onMounted,
  reactive,
  ref,
} from 'vue';
import Vehicle from '@/components/Vehicle.vue';
import Building from '@/components/Building.vue';
import rad2deg from '@/functions/rad2deg';

interface Vehicleish {
  id: number;
  x: number;
  y: number;
  orientation: number;
  targetX: number;
  targetY: number;
  moving: boolean;
}

const SPEED = 0.3;

export default {
  components: {
    Vehicle, Building,
  },
  setup() {
    const vehicle = reactive({
      id: 1,
      x: 100,
      y: 200,
      orientation: 30,
      targetX: 0,
      targetY: 0,
      moving: false,
    });

    const building = reactive({
      id: 2,
      x: 200,
      y: 350,
    });

    const selectedEntityId = ref(-1);

    const selectVehicle = () => {
      selectedEntityId.value = vehicle.id;
    };

    const selectBuilding = () => {
      selectedEntityId.value = building.id;
    };

    const clickMap = () => {
      selectedEntityId.value = -1;
    };

    const update = (delta: number) => {
      const t1 = new Date();

      if (vehicle.moving) {
        const dx = vehicle.targetX - vehicle.x;
        const dy = vehicle.targetY - vehicle.y;

        const len = Math.sqrt(dx * dx + dy * dy);
        const speed = SPEED * delta;

        if (len >= speed) {
          const nx = dx / len;
          const ny = dy / len;

          vehicle.x += nx * speed;
          vehicle.y += ny * speed;
        } else {
          vehicle.x = vehicle.targetX;
          vehicle.y = vehicle.targetY;
          vehicle.moving = false;
        }
      }

      requestAnimationFrame(() => {
        const t2 = new Date();
        update(t2.getTime() - t1.getTime());
      });
    };

    const actionMap = (event: MouseEvent) => {
      if (selectedEntityId.value !== -1) {
        const dx = event.offsetX - vehicle.x;
        const dy = event.offsetY - vehicle.y;

        vehicle.orientation = rad2deg(Math.atan2(-dx, dy));
        vehicle.targetX = event.offsetX;
        vehicle.targetY = event.offsetY;
        vehicle.moving = true;
      }
    };

    onMounted(() => update(0));

    return {
      vehicle,
      building,
      selectVehicle,
      selectBuilding,
      selectedEntityId,
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
  background-image: url('../assets/lunar-rock.png');
  position: relative;
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
