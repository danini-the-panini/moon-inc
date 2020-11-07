import rad2deg from '@/functions/rad2deg';
import BaseEntity from './BaseEntity';

export default class BuildingEntity extends BaseEntity {
  moving: boolean;

  targetX: number;

  targetY: number;

  speed: number;

  constructor(attributes: {
    name: string;
    sprite: string;
    x: number;
    y: number;
    orientation: number;
    width: number;
    height: number;
    areaOfEffect: number;
    speed: number;
  }) {
    super(attributes);
    this.targetX = 0;
    this.targetY = 0;
    this.moving = false;
    this.speed = attributes.speed;
  }

  update(delta: number) {
    if (this.moving) {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;

      const len = Math.sqrt(dx * dx + dy * dy);
      const speed = this.speed * delta;

      if (len >= speed) {
        const nx = dx / len;
        const ny = dy / len;

        this.x += nx * speed;
        this.y += ny * speed;
      } else {
        this.x = this.targetX;
        this.y = this.targetY;
        this.moving = false;
      }
    }
  }

  performActionOnMap(x: number, y: number) {
    const dx = x - this.x;
    const dy = y - this.y;

    this.orientation = rad2deg(Math.atan2(-dx, dy));
    this.targetX = x;
    this.targetY = y;
    this.moving = true;
  }
}
