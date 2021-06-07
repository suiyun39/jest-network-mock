export type ConnectionType =
  | "bluetooth"
  | "cellular"
  | "ethernet"
  | "mixed"
  | "none"
  | "other"
  | "unknown"
  | "wifi"
  | "wimax";

export type EffectiveConnectionType = "2g" | "3g" | "4g" | "slow-2g";
export type Megabit = number;
export type Millisecond = number;

export class NetworkInformation extends EventTarget {
  downlink: Megabit;
  downlinkMax: Megabit;
  effectiveType: EffectiveConnectionType;
  onchange: EventListener | undefined;
  rtt: Millisecond;
  saveData: boolean;
  type: ConnectionType;

  constructor() {
    super();

    // default value
    this.downlink = 1.45;
    this.downlinkMax = 10;
    this.effectiveType = "4g";
    this.onchange = undefined;
    this.rtt = 300;
    this.saveData = false;
    this.type = "wifi";
  }

  dispatchEvent(event: Event): boolean {
    if (typeof this.onchange === "function" && event.type === "change") {
      const eventData: Event = {
        ...new Event("change"),
        type: "change",
        currentTarget: this,
        srcElement: this,
        target: this,
      };

      this.onchange.call(this, eventData);
    }

    return super.dispatchEvent(event);
  }
}
