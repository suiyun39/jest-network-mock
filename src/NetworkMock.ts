import {
  ConnectionType,
  EffectiveConnectionType,
  Megabit,
  Millisecond,
  NetworkInformation,
} from "./NetworkInformation";

export class NetworkMock {
  static mock(): void {
    if ("connection" in navigator) return;

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

  static dispatch(state: {
    downlink?: Megabit;
    downlinkMax?: Megabit;
    effectiveType?: EffectiveConnectionType;
    rtt?: Millisecond;
    saveData?: boolean;
    type?: ConnectionType;
  }): void {
    if (!("connection" in navigator)) return;

    const target = navigator.connection as NetworkInformation;

    state.downlink && (target.downlink = state.downlink);
    state.downlinkMax && (target.downlinkMax = state.downlinkMax);
    state.effectiveType && (target.effectiveType = state.effectiveType);
    state.rtt && (target.rtt = state.rtt);
    state.saveData && (target.saveData = state.saveData);
    state.type && (target.type = state.type);

    target.dispatchEvent(new Event("change"));
  }
}
