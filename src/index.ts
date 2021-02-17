import {
  NetworkInformation,
  EffectiveConnectionType,
  ConnectionType,
  Millisecond,
  Megabit,
} from "./NetworkInformation";

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

type NetworkState = {
  downlink?: Megabit;
  downlinkMax?: Megabit;
  effectiveType?: EffectiveConnectionType;
  rtt?: Millisecond;
  saveData?: boolean;
  type?: ConnectionType;
};

export class NetworkMock {
  // 执行 mock
  static mock(): { dispatch: (state: NetworkState) => void } {
    if ("connection" in navigator) {
      throw "navigator.connection is defined";
    }

    const target = new NetworkInformation();

    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: target,
    });

    // 对外提供的触发函数
    const dispatch = (state: NetworkState) => {
      state.downlink && (target.downlink = state.downlink);
      state.downlinkMax && (target.downlinkMax = state.downlinkMax);
      state.effectiveType && (target.effectiveType = state.effectiveType);
      state.rtt && (target.rtt = state.rtt);
      state.saveData && (target.saveData = state.saveData);
      state.type && (target.type = state.type);

      target.dispatchEvent(new Event("change"));
    };

    return { dispatch };
  }

  // 清理函数
  static clean(): void {
    if ("connection" in navigator) {
      delete navigator["connection"];
    }
  }
}
