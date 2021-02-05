import { NetworkEvent } from "./NetworkEvent";

type Listener = (event: NetworkEvent) => void;

export class NetworkInformation {
  private readonly eventMap: Map<string, Set<Listener>>;

  constructor() {
    this.eventMap = new Map();
  }

  addEventListener(type: string, listener: Listener, options?: boolean) {
    if (!this.eventMap.has(type)) {
      this.eventMap.set(type, new Set());
    }

    const eventListener = this.eventMap.get(type) as Set<Listener>;
    eventListener.add(listener);
  }

  removeEventListener(type: string, listener: Listener, options?: boolean) {
    if (!this.eventMap.has(type)) {
      return;
    }

    const eventListener = this.eventMap.get(type) as Set<Listener>;
    eventListener.delete(listener);
  }

  dispatchEvent(event: Event) {
    if (!this.eventMap.has(event.type)) {
      return;
    }

    const eventListener = this.eventMap.get(event.type) as Set<Listener>;
    eventListener.forEach(listener => {
      const networkEvent = new NetworkEvent(event.type, this);
      listener && listener(networkEvent);
    });
  }

  // 仅供测试使用
  getEventListener(type: string) {
    return this.eventMap.get(type);
  }
}
