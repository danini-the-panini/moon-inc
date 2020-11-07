import BaseEntity from '@/classes/BaseEntity';
import BaseSystem from './BaseSystem';
import PowerStoringSystem from './PowerStoringSystem';

export default class PowerGeneratingSystem extends BaseSystem {
  rate: number;

  constructor(entity: BaseEntity, attributes: { rate: number }) {
    super(entity);
    this.rate = attributes.rate;
  }

  update(delta: number) {
    let storingEntities = this.entity.game.findEntities((e: BaseEntity) => {
      return e.hasSystem('power-storing') && e.withinAreaOfEffect(this.entity);
    });

    if (storingEntities.length === 0) return;

    const ratePerEntity = this.rate * delta / storingEntities.length;

    storingEntities.forEach((e: BaseEntity) => {
      const system = e.getSystem('power-storing') as PowerStoringSystem;

      system.storePower(ratePerEntity);
    });
  }
}
