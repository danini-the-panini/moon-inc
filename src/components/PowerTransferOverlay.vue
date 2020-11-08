<template>
  <div class="overlay">
      <svg
        class="connection"
        v-for="entity in connections"
        :style="styleForConnection(entity)"
        :key="entity.id"
        :width="widthForConnection(entity)"
        :height="heightForConnection(entity)"
        :viewBox="`0 0 ${widthForConnection(entity)} ${heightForConnection(entity)}`"
      >
        <path :d="pathForConnection(entity)" stroke="red"></path>
      </svg>
  </div>
</template>

<script lang="ts">
import PowerTransferSystem from '@/systems/PowerTransferSystem';
import { computed } from 'vue';
import BaseEntity from '@/classes/BaseEntity';

export default {
  props: {
    system: PowerTransferSystem,
  },
  setup(props: {
    system: PowerTransferSystem;
  }) {
    const connections = computed(() => {
      const { entity } = props.system;

      return entity.game.findEntities((otherEntity) => {
        if (otherEntity === entity) return false;

        return entity.withinAreaOfEffect(otherEntity) && (
          otherEntity.hasSystem('power-transfer')
          || otherEntity.hasSystem('power-generating')
          || otherEntity.hasSystem('power-storing')
        );
      });
    });

    const minMaxForConnection = (otherEntity: BaseEntity) => {
      const { entity } = props.system;

      const minX = Math.min(entity.x, otherEntity.x);
      const maxX = Math.max(entity.x, otherEntity.x);

      const minY = Math.min(entity.y, otherEntity.y);
      const maxY = Math.max(entity.y, otherEntity.y);

      return [[minX, minY], [maxX, maxY]];
    };

    const widthForConnection = (otherEntity: BaseEntity) => {
      const [[minX], [maxX]] = minMaxForConnection(otherEntity);

      return Math.max(10, maxX - minX);
    };

    const heightForConnection = (otherEntity: BaseEntity) => {
      const [[, minY], [, maxY]] = minMaxForConnection(otherEntity);

      return Math.max(10, maxY - minY);
    };

    const styleForConnection = (otherEntity: BaseEntity) => {
      const { entity } = props.system;
      const [[minX, minY]] = minMaxForConnection(otherEntity);

      return {
        top: `${minY - entity.y}px`,
        left: `${minX - entity.x}px`,
        width: `${widthForConnection(otherEntity)}px`,
        height: `${heightForConnection(otherEntity)}px`,
      };
    };

    const pathForConnection = (otherEntity: BaseEntity) => {
      const { entity } = props.system;
      const [[minX, minY]] = minMaxForConnection(otherEntity);

      return `M${entity.x - minX} ${entity.y - minY} L${otherEntity.x - minX} ${otherEntity.y - minY} Z`;
    };

    return {
      connections,
      widthForConnection,
      heightForConnection,
      styleForConnection,
      pathForConnection,
    };
  },
};
</script>

<style lang="scss" scoped>
.connection {
  position: absolute;
  pointer-events: none;
}
</style>
