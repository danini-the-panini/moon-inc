import BaseEntity from './BaseEntity';

export default class BuildingEntity extends BaseEntity {
  constructor(attributes: {
    name: string;
    sprite: string;
    x: number;
    y: number;
    width: number;
    height: number;
    areaOfEffect: number;
  }) {
    super({
      ...attributes,
      orientation: 0,
    });
  }
}
