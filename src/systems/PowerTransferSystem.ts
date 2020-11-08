import BaseSystem from './BaseSystem';

export default class PowerTransferSystem extends BaseSystem {
  get overlayComponent() {
    return 'PowerTransferOverlay';
  }
}
