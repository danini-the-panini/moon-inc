import BaseEntity from '@/classes/BaseEntity';
import BaseSystem from './BaseSystem';

export default class DepositSystem extends BaseSystem {
  value: number;
  type: string;

  constructor(entity: BaseEntity, attributes: { value: number; type: string }) {
    super(entity);
    this.value = attributes.value;
    this.type = attributes.type;
  }

  collect(amount: number) {
    const valueTaken = Math.min(this.value, amount);
    this.value -= valueTaken;
    return valueTaken;
  }

  get overlayComponent() {
    return 'DepositOverlay';
  }
}
