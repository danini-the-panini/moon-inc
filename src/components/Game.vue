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
import Buggy from '@/assets/buggy.png';
import Powerplant from '@/assets/powerplant.png';
import SolarPanels from '@/assets/solar-panels.png';
import BaseEntity from '@/classes/BaseEntity';
import VehicleEntity from '@/classes/VehicleEntity';
import BuildingEntity from '@/classes/BuildingEntity';

const SPEED = 0.3;

function indexById(array: Array<BaseEntity>) {
  const map: Map<string, BaseEntity> = new Map();

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
      new VehicleEntity({
        sprite: Buggy,
        name: 'Buggy 1',
        x: 500,
        y: 500,
        width: 64,
        height: 64,
        orientation: 30,
        areaOfEffect: 0,
        speed: SPEED,
      }),
      new VehicleEntity({
        sprite: Buggy,
        name: 'Buggy 2',
        x: 700,
        y: 600,
        width: 64,
        height: 64,
        orientation: 160,
        areaOfEffect: 0,
        speed: SPEED,
      }),
      new BuildingEntity({
        sprite: Powerplant,
        name: 'Power Plant',
        x: 256,
        y: 256,
        width: 256,
        height: 256,
        areaOfEffect: 384,
      }),
      new BuildingEntity({
        sprite: SolarPanels,
        name: 'Solar Panels',
        x: 512,
        y: 256,
        width: 128,
        height: 128,
        areaOfEffect: 0,
      }),
    ]));

    const selectedEntityId: Ref<string | null> = ref(null);

    const selectedEntity: ComputedRef<BaseEntity | null> = computed(() => {
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
        entity.update(delta);
      });

      requestAnimationFrame(() => {
        const t2 = new Date();
        update(t2.getTime() - t1.getTime());
      });
    };

    const actionMap = (event: MouseEvent) => {
      if (selectedEntityId.value !== null) {
        const entity = selectedEntity.value;

        if (entity !== null) {
          entity.performActionOnMap(event.offsetX, event.offsetY);
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
