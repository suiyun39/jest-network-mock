import { NetworkEvent } from "./NetworkEvent";

type Listener = (event: NetworkEvent) => void;
type EffectiveType = "slow-2g" | "2g" | "3g" | "4g";
type NetworkType = "bluetooth" | "cellular" | "ethernet" | "none" | "wifi" | "wimax" | "other" | "unknown";

export class NetworkInformation {
  private readonly eventMap: Map<string, Set<Listener>>;

  // 网络信息状态
  downlink: number;
  downlinkMax: number;
  effectiveType: EffectiveType;
  rtt: number;
  saveData: boolean;
  type: NetworkType;

  constructor() {
    this.eventMap = new Map();

    // 初始化状态
    this.downlink = 1.45;
    this.downlinkMax = 10;
    this.effectiveType = "4g";
    this.rtt = 300;
    this.saveData = false;
    this.type = "wifi";
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
