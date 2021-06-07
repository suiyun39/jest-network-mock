import { ConnectionType, EffectiveConnectionType, Megabit, Millisecond, NetworkInformation } from "./information";

type NetworkState = Partial<{
  downlink: Megabit;
  downlinkMax: Megabit;
  effectiveType: EffectiveConnectionType;
  rtt: Millisecond;
  saveData: boolean;
  type: ConnectionType;
}>;

export class NetworkMock {
  static mock(): void {
    if ("connection" in navigator) {
      throw new Error("navigator.connection is defined");
    }

    const information = new NetworkInformation();

    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: information,
    });
  }

  static clean(): void {
    if ("connection" in navigator) {
      delete navigator["connection"];
    }
  }

  static dispatch(state: NetworkState): boolean {
    if (!("connection" in navigator)) {
      throw new Error("navigator.connection is not defined");
    }

    const target = navigator.connection as NetworkInformation;

    target.downlink = state.downlink ?? target.downlink;
    target.downlinkMax = state.downlinkMax ?? target.downlinkMax;
    target.effectiveType = state.effectiveType ?? target.effectiveType;
    target.rtt = state.rtt ?? target.rtt;
    target.saveData = state.saveData ?? target.saveData;
    target.type = state.type ?? target.type;

    return target.dispatchEvent(new Event("change"));
  }
}
