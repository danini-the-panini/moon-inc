<template>
  <div
    :class="{ container: true, selected: selected }"
    :style="containerStyle">
    <div class="image" :style="imageStyle"></div>
    <div v-if="selected && entity.areaOfEffect > 0" class="aoe" :style="aoeStyle"></div>
    <div v-for="[systemName, system] in entity.systems" :key="systemName">
      <component
        :is="system.overlayComponent"
        :system="system"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import BaseEntity from '@/classes/BaseEntity';
import NoOverlay from './NoOverlay.vue';
import PowerStoringOverlay from './PowerStoringOverlay.vue';
import PowerTransferOverlay from './PowerTransferOverlay.vue';

export default {
  components: {
    NoOverlay,
    PowerStoringOverlay,
    PowerTransferOverlay,
  },
  props: {
    selected: Boolean,
    entity: BaseEntity,
  },
  setup(props: {
    selected: boolean;
    entity: BaseEntity;
  }) {
    const containerStyle = computed(() => ({
      transform: `translate(-50%, -50%) translate(${props.entity.x}px, ${props.entity.y}px)`,
      width: `${props.entity.width}px`,
      height: `${props.entity.height}px`,
    }));

    const imageStyle = computed(() => ({
      transform: `rotate(${props.entity.orientation}deg)`,
      backgroundImage: `url(${props.entity.sprite})`,
    }));

    const aoeStyle = computed(() => ({
      width: `${props.entity.areaOfEffect * 2}px`,
      height: `${props.entity.areaOfEffect * 2}px`,
    }));

    return {
      containerStyle,
      imageStyle,
      aoeStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 4rem;
  height: 4rem;
  position: absolute;

  &.selected {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      outline: 2px solid magenta;
    }
  }
}

.image {
  display: block;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  position: absolute;
}

.aoe {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid #00ff00;
  pointer-events: none;
}
</style>
