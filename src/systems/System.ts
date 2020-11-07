export default interface System {
  update(delta: number): void;
  performActionOnMap(x: number, y: number): void;
}
