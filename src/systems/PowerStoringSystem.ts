import BaseEntity from '@/classes/BaseEntity';
import BaseSystem from './BaseSystem';

export default class PowerGeneratingSystem extends BaseSystem {
  capacity: number;
  stored: number;

  constructor(entity: BaseEntity, attributes: { capacity: number }) {
    super(entity);
    this.capacity = attributes.capacity;
    this.stored = 0;
  }

  storePower(value: number) {
    this.stored = Math.min(this.capacity, this.stored + value);
  }

  get overlayComponent() {
    return 'PowerStoringOverlay';
  }
}
