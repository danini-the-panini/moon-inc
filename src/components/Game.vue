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
          :entity="entity"
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

import Entity from '@/components/Entity.vue';
import Buggy from '@/assets/buggy.png';
import Powerplant from '@/assets/powerplant.png';
import SolarPanels from '@/assets/solar-panels.png';
import Pylon from '@/assets/pylon.png';
import BaseEntity from '@/classes/BaseEntity';
import MovementSystem from '@/systems/MovementSystem';
import PowerGeneratingSystem from '@/systems/PowerGeneratingSystem';
import PowerStoringSystem from '@/systems/PowerStoringSystem';
import PowerTransferSystem from '@/systems/PowerTransferSystem';
import GameMethods from '@/classes/GameMethods';

const SPEED = 300;

export default {
  components: {
    Entity,
  },
  setup() {
    const entities = reactive(new Map<string, BaseEntity>());

    const game: GameMethods = {
      findEntities(finder) {
        const results: Array<BaseEntity> = [];

        entities.forEach((entity) => {
          if (finder(entity)) results.push(entity);
        });

        return results;
      },
    };

    const buggy1 = new BaseEntity(game, {
      sprite: Buggy,
      name: 'Buggy 1',
      x: 500,
      y: 500,
      width: 64,
      height: 64,
      orientation: 30,
      areaOfEffect: 0,
    });
    buggy1.systems.set('movement', new MovementSystem(buggy1, { speed: SPEED }));
    entities.set(buggy1.id, buggy1);

    const buggy2 = new BaseEntity(game, {
      sprite: Buggy,
      name: 'Buggy 1',
      x: 700,
      y: 600,
      width: 64,
      height: 64,
      orientation: 160,
      areaOfEffect: 0,
    });
    buggy2.systems.set('movement', new MovementSystem(buggy2, { speed: SPEED }));
    entities.set(buggy2.id, buggy2);

    const powerplant = new BaseEntity(game, {
      sprite: Powerplant,
      name: 'Power Plant',
      x: 256,
      y: 256,
      width: 256,
      height: 256,
      orientation: 0,
      areaOfEffect: 384,
    });
    powerplant.systems.set('power-storing', new PowerStoringSystem(powerplant, { capacity: 100 }));
    entities.set(powerplant.id, powerplant);

    const solarPanels = new BaseEntity(game, {
      sprite: SolarPanels,
      name: 'Solar Panels',
      x: 1536,
      y: 256,
      width: 128,
      height: 128,
      orientation: 0,
      areaOfEffect: 0,
    });
    solarPanels.systems.set('power-generating', new PowerGeneratingSystem(solarPanels, { rate: 10 }));
    entities.set(solarPanels.id, solarPanels);

    [0, 1, 2, 3].forEach((x) => {
      const pylon = new BaseEntity(game, {
        sprite: Pylon,
        name: `Pylon ${x + 1}`,
        x: 512 + x * 256,
        y: 256 + x * 64,
        width: 64,
        height: 128,
        orientation: 0,
        areaOfEffect: 384,
      });
      pylon.systems.set('power-transfer', new PowerTransferSystem(pylon));
      entities.set(pylon.id, pylon);
    });

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
        update((t2.getTime() - t1.getTime()) / 1000);
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
