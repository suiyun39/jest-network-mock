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
  downlink: Megabit = 1.45;
  downlinkMax: Megabit = 10;
  effectiveType: EffectiveConnectionType = "4g";
  onchange: EventListener | undefined = undefined;
  rtt: Millisecond = 300;
  saveData = false;
  type: ConnectionType = "wifi";

  constructor() {
    super();
  }

  dispatchEvent(event: Event): boolean {
    if (this.onchange && event.type === "change") {
      const changeEvent: Event = { ...new Event("change"), type: "change" };
      const evt: Event = { ...changeEvent, currentTarget: this, srcElement: this, target: this };

      this.onchange.call(this, evt);
    }

    return super.dispatchEvent(event);
  }
}
