import {
  ConnectionType,
  EffectiveConnectionType,
  Megabit,
  Millisecond,
  NetworkInformation,
} from "./NetworkInformation";

type NetworkState = {
  downlink?: Megabit;
  downlinkMax?: Megabit;
  effectiveType?: EffectiveConnectionType;
  rtt?: Millisecond;
  saveData?: boolean;
  type?: ConnectionType;
};

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

    typeof state.downlink !== "undefined" && (target.downlink = state.downlink);
    typeof state.downlinkMax !== "undefined" && (target.downlinkMax = state.downlinkMax);
    typeof state.effectiveType !== "undefined" && (target.effectiveType = state.effectiveType);
    typeof state.rtt !== "undefined" && (target.rtt = state.rtt);
    typeof state.saveData !== "undefined" && (target.saveData = state.saveData);
    typeof state.type !== "undefined" && (target.type = state.type);

    return target.dispatchEvent(new Event("change"));
  }
}
