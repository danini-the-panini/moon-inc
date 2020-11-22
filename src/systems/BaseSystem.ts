import BaseEntity from '@/classes/BaseEntity';

export default abstract class BaseSystem {
  entity: BaseEntity;

  constructor(entity: BaseEntity) {
    this.entity = entity;
  }

  update(delta: number): void { }

  performActionOnMap(x: number, y: number): void { }

  get overlayComponent(): string {
    return 'NoOverlay';
  }
}
