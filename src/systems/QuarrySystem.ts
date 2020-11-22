import BaseEntity from '@/classes/BaseEntity';
import DepositSystem from './DepositSystem';
import StoringSystem from './StoringSystem';

export default class QuarrySystem extends StoringSystem {
  rate: number;
  type: string;

  constructor(entity: BaseEntity, attributes: { rate: number; capacity: number; type: string }) {
    super(entity, { capacity: attributes.capacity });
    this.rate = attributes.rate;
    this.type = attributes.type;
  }

  update(delta: number) {
    const depositEntities = this.entity.game.findEntities((e: BaseEntity) => (
      e.hasSystem('deposit')
        && this.entity.withinAreaOfEffect(e)
        && (e.getSystem('deposit') as DepositSystem).type === this.type
    ));

    if (depositEntities.length === 0) return;

    const ratePerEntity = (this.rate * delta) / depositEntities.length;

    depositEntities.forEach((e: BaseEntity) => {
      const system = e.getSystem('deposit') as DepositSystem;

      const amount = Math.min(ratePerEntity, this.capacity - this.stored);

      this.store(system.collect(amount));
    });
  }
}
