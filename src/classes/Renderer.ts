export default class Renderer {
  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (ctx !== null) {
      this.context = ctx;
    } else {
      throw new Error('Cannot create canvas context');
    }
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  render() {
    this.canvas.width = this.canvas.scrollWidth;
    this.canvas.height = this.canvas.scrollHeight;

    this.context.clearRect(0, 0, this.width, this.height);

    this.context.fillStyle = 'magenta';
    this.context.fillRect(10, 10, 100, 100);

    requestAnimationFrame(() => this.render());
  }
}
