import { NetworkInformation } from "./NetworkInformation";

describe("NetworkInformation", () => {
  it("事件注册移除", () => {
    const target = new NetworkInformation();
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    target.addEventListener("change", listener1);
    target.addEventListener("change", listener2);
    expect(target.getEventListener("change")?.size).toBe(2);

    target.removeEventListener("change", listener1);
    expect(target.getEventListener("change")?.size).toBe(1);

    target.removeEventListener("change", listener2);
    expect(target.getEventListener("change")?.size).toBe(0);
  });

  it("事件重复注册移除", () => {
    const target = new NetworkInformation();
    const listener = jest.fn();

    target.addEventListener("change", listener);
    expect(target.getEventListener("change")?.size).toBe(1);

    target.addEventListener("change", listener);
    expect(target.getEventListener("change")?.size).toBe(1);

    target.removeEventListener("change", listener);
    expect(target.getEventListener("change")?.size).toBe(0);

    target.removeEventListener("change", listener);
    expect(target.getEventListener("change")?.size).toBe(0);
  });

  it("事件触发测试", () => {
    const target = new NetworkInformation();
    const listener = jest.fn();

    target.addEventListener("change", listener);
    expect(listener).toBeCalledTimes(0);

    target.dispatchEvent(new Event("change"));
    target.dispatchEvent(new Event("change"));
    expect(listener).toBeCalledTimes(2);

    target.removeEventListener("change", listener);
    target.dispatchEvent(new Event("change"));
    expect(listener).toBeCalledTimes(2);
  });

  it("边界情况测试", () => {
    const target = new NetworkInformation();
    const listener = jest.fn();

    target.addEventListener("change", listener);
    expect(target.getEventListener("change")?.size).toBe(1);

    target.removeEventListener("load", listener);
    expect(target.getEventListener("change")?.size).toBe(1);

    target.dispatchEvent(new Event("click"));
    expect(listener).toBeCalledTimes(0);
  });

  it("验证初始化状态", done => {
    const target = new NetworkInformation();

    target.addEventListener("change", event => {
      expect(event.target.downlink).toBe(1.45);
      expect(event.target.downlinkMax).toBe(10);
      expect(event.target.effectiveType).toBe("4g");
      expect(event.target.rtt).toBe(300);
      expect(event.target.saveData).toBe(false);
      expect(event.target.type).toBe("wifi");

      done();
    });

    target.dispatchEvent(new Event("change"));
  });
});
