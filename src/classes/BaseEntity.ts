import System from '@/systems/System';
import { v4 as uuid } from 'uuid';

export default class BaseEntity {
  id: string;

  name: string;

  sprite: string;

  x: number;

  y: number;

  width: number;

  height: number;

  orientation: number;

  areaOfEffect: number;

  systems: Map<string, System>

  constructor(attributes: {
    name: string;
    sprite: string;
    x: number;
    y: number;
    width: number;
    height: number;
    orientation: number;
    areaOfEffect: number;
  }) {
    this.id = uuid();
    this.name = attributes.name;
    this.sprite = attributes.sprite;
    this.x = attributes.x;
    this.y = attributes.y;
    this.width = attributes.width;
    this.height = attributes.height;
    this.orientation = attributes.orientation;
    this.areaOfEffect = attributes.areaOfEffect;
    this.systems = new Map<string, System>();
  }

  update(delta: number): void {
    this.systems.forEach((system) => {
      system.update(delta);
    });
  }

  performActionOnMap(x: number, y: number): void {
    this.systems.forEach((system) => {
      system.performActionOnMap(x, y);
    });
  }
}
