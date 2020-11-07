import BaseEntity from '@/classes/BaseEntity';
import rad2deg from '@/functions/rad2deg';
import BaseSystem from './BaseSystem';

export default class MovementSystem extends BaseSystem {
  moving: boolean;

  targetX: number;

  targetY: number;

  speed: number;

  constructor(entity: BaseEntity, attributes: {
    speed: number;
  }) {
    super(entity);
    this.targetX = 0;
    this.targetY = 0;
    this.moving = false;
    this.speed = attributes.speed;
  }

  update(delta: number) {
    if (this.moving) {
      const dx = this.targetX - this.entity.x;
      const dy = this.targetY - this.entity.y;

      const len = Math.sqrt(dx * dx + dy * dy);
      const speed = this.speed * delta;

      if (len >= speed) {
        const nx = dx / len;
        const ny = dy / len;

        this.entity.x += nx * speed;
        this.entity.y += ny * speed;
      } else {
        this.entity.x = this.targetX;
        this.entity.y = this.targetY;
        this.moving = false;
      }
    }
  }

  performActionOnMap(x: number, y: number) {
    const dx = x - this.entity.x;
    const dy = y - this.entity.y;

    this.entity.orientation = rad2deg(Math.atan2(-dx, dy));
    this.targetX = x;
    this.targetY = y;
    this.moving = true;
  }
}
