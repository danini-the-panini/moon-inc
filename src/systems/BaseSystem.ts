import BaseEntity from '@/classes/BaseEntity';
import System from './System';

export default abstract class BaseSystem implements System {
  entity: BaseEntity;

  constructor(entity: BaseEntity) {
    this.entity = entity;
  }

  update(delta: number): void { }

  performActionOnMap(x: number, y: number): void { }
}
