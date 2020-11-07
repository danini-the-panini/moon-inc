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
        <Entity
          v-for="[id, entity] in entities"
          :key="id"
          v-bind="entity"
          :selected="entity.id === selectedEntityId"
          @click.left.stop="selectEntity(entity)"
        />
      </div>
      <div class="right-sidebar">
        <span v-if="selectedEntityId">
          Selected: {{selectedEntity.name}}
        </span>
      </div>
    </main>
    <footer>
      © 2020 sourlemon {&gt;.&lt;}
    </footer>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  onMounted,
  reactive,
  Ref,
  ref,
} from 'vue';
import { v4 as uuid } from 'uuid';

import Entity from '@/components/Entity.vue';
import rad2deg from '@/functions/rad2deg';
import Buggy from '@/assets/buggy.png';
import Powerplant from '@/assets/powerplant.png';
import SolarPanels from '@/assets/solar-panels.png';

interface Entityish {
  id: string;
  name: string;
  sprite: string;
  x: number;
  y: number;
  width: number;
  height: number;
  orientation: number;
  targetX: number;
  targetY: number;
  moving: boolean;
  canMove: boolean;
}

const SPEED = 0.3;

function indexById(array: Array<Entityish>) {
  const map: Map<string, Entityish> = new Map();

  array.forEach((item) => {
    map.set(item.id, item);
  });

  return map;
}

export default {
  components: {
    Entity,
  },
  setup() {
    const entities = reactive(indexById([
      {
        sprite: Buggy,
        name: 'Buggy 1',
        id: uuid(),
        x: 500,
        y: 500,
        width: 64,
        height: 64,
        orientation: 30,
        targetX: 0,
        targetY: 0,
        moving: false,
        canMove: true,
      },
      {
        id: uuid(),
        sprite: Buggy,
        name: 'Buggy 2',
        x: 700,
        y: 600,
        width: 64,
        height: 64,
        orientation: 160,
        targetX: 0,
        targetY: 0,
        moving: false,
        canMove: true,
      },
      {
        sprite: Powerplant,
        name: 'Power Plant',
        id: uuid(),
        x: 256,
        y: 256,
        width: 256,
        height: 256,
        orientation: 0,
        targetX: 0,
        targetY: 0,
        moving: false,
        canMove: false,
      },
      {
        sprite: SolarPanels,
        name: 'Solar Panels',
        id: uuid(),
        x: 512,
        y: 256,
        width: 128,
        height: 128,
        orientation: 0,
        targetX: 0,
        targetY: 0,
        moving: false,
        canMove: false,
      },
    ]));

    const selectedEntityId: Ref<string | null> = ref(null);

    const selectedEntity: ComputedRef<Entityish | null> = computed(() => {
      if (selectedEntityId.value === null) return null;
      return entities.get(selectedEntityId.value) || null;
    });

    const selectEntity = (entity: { id: string }) => {
      selectedEntityId.value = entity.id;
    };

    const clickMap = () => {
      selectedEntityId.value = null;
    };

    const update = (delta: number) => {
      const t1 = new Date();

      entities.forEach((entity) => {
        if (entity.moving) {
          const dx = entity.targetX - entity.x;
          const dy = entity.targetY - entity.y;

          const len = Math.sqrt(dx * dx + dy * dy);
          const speed = SPEED * delta;

          if (len >= speed) {
            const nx = dx / len;
            const ny = dy / len;

            entity.x += nx * speed;
            entity.y += ny * speed;
          } else {
            entity.x = entity.targetX;
            entity.y = entity.targetY;
            entity.moving = false;
          }
        }
      });

      requestAnimationFrame(() => {
        const t2 = new Date();
        update(t2.getTime() - t1.getTime());
      });
    };

    const actionMap = (event: MouseEvent) => {
      if (selectedEntityId.value !== null) {
        const entity = selectedEntity.value;

        if (entity !== null && entity.canMove) {
          const dx = event.offsetX - entity.x;
          const dy = event.offsetY - entity.y;

          entity.orientation = rad2deg(Math.atan2(-dx, dy));
          entity.targetX = event.offsetX;
          entity.targetY = event.offsetY;
          entity.moving = true;
        }
      }
    };

    onMounted(() => update(0));

    return {
      entities,
      selectEntity,
      selectedEntityId,
      selectedEntity,
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
