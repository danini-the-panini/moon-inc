import BaseSystem from '@/systems/BaseSystem';
import { v4 as uuid } from 'uuid';
import GameMethods from './GameMethods';

export default class BaseEntity {
  game: GameMethods;
  id: string;
  name: string;
  sprite: string;
  x: number;
  y: number;
  width: number;
  height: number;
  orientation: number;
  areaOfEffect: number;
  systems: Map<string, BaseSystem>

  constructor(game: GameMethods, attributes: {
    name: string;
    sprite: string;
    x: number;
    y: number;
    width: number;
    height: number;
    orientation: number;
    areaOfEffect: number;
  }) {
    this.game = game;
    this.id = uuid();
    this.name = attributes.name;
    this.sprite = attributes.sprite;
    this.x = attributes.x;
    this.y = attributes.y;
    this.width = attributes.width;
    this.height = attributes.height;
    this.orientation = attributes.orientation;
    this.areaOfEffect = attributes.areaOfEffect;
    this.systems = new Map<string, BaseSystem>();
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

  hasSystem(systemName: string) {
    return this.systems.has(systemName);
  }

  getSystem(systemName: string) {
    return this.systems.get(systemName);
  }

  withinAreaOfEffect(otherEntity: BaseEntity) {
    const dx = otherEntity.x - this.x;
    const dy = otherEntity.y - this.y;

    return dx * dx + dy * dy <= this.areaOfEffect * this.areaOfEffect;
  }
}
