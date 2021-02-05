import { NetworkInformation, EffectiveType, NetworkType } from "./mock/NetworkInformation";

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

export class NetworkMock {
  // 执行 mock
  static mock() {
    if ("connection" in navigator) {
      throw "navigator.connection is defined";
    }

    const target = new NetworkInformation();

    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: target,
    });

    // 对外提供的触发函数
    const dispatch = (state: {
      downlink?: number;
      downlinkMax?: number;
      effectiveType?: EffectiveType;
      rtt?: number;
      saveData?: boolean;
      type?: NetworkType;
    }) => {
      state.downlink && (target.downlink = state.downlink);
      state.downlinkMax && (target.downlinkMax = state.downlinkMax);
      state.effectiveType && (target.effectiveType = state.effectiveType);
      state.rtt && (target.rtt = state.rtt);
      state.saveData && (target.saveData = state.saveData);
      state.type && (target.type = state.type);

      target.dispatchEvent(new Event("change"));
    };

    return {
      clean: this.clean,
      dispatch,
    };
  }

  // 清理函数
  private static clean() {
    if ("connection" in navigator) {
      delete navigator["connection"];
    }
  }
}
