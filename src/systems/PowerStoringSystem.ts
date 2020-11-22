import StoringSystem from './StoringSystem';

export default class PowerStoringSystem extends StoringSystem {
  storePower(value: number) {
    this.store(value);
  }
}
