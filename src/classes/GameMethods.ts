import BaseEntity from './BaseEntity';

export default interface GameMethods {
  findEntities(finder: (entity: BaseEntity) => boolean): Array<BaseEntity>;
}
