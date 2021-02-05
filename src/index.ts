import { NetworkInformation } from "./mock/NetworkInformation";

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

    return {
      clean: this.clean,
    };
  }

  // 清理函数
  private static clean() {
    if ("connection" in navigator) {
      delete navigator["connection"];
    }
  }
}
