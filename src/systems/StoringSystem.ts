import BaseEntity from '@/classes/BaseEntity';
import BaseSystem from './BaseSystem';

export default class StoringSystem extends BaseSystem {
  capacity: number;
  stored: number;

  constructor(entity: BaseEntity, attributes: { capacity: number }) {
    super(entity);
    this.capacity = attributes.capacity;
    this.stored = 0;
  }

  store(value: number) {
    this.stored = Math.min(this.capacity, this.stored + value);
  }

  get overlayComponent() {
    return 'StoringOverlay';
  }
}
