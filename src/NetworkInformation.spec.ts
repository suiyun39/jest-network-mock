import { NetworkInformation } from "./NetworkInformation";

test("应能在创建时正确初始化预设值", () => {
  const information = new NetworkInformation();

  expect(information.downlink).toBe(1.45);
  expect(information.downlinkMax).toBe(10);
  expect(information.effectiveType).toBe("4g");
  expect(information.rtt).toBe(300);
  expect(information.saveData).toBe(false);
  expect(information.type).toBe("wifi");
});

test("应能正确的处理事件注册, 移除和触发", () => {
  const information = new NetworkInformation();
  const listener1 = jest.fn();
  const listener2 = jest.fn();

  information.addEventListener("change", listener1, false);
  information.addEventListener("change", listener2, false);
  information.dispatchEvent(new Event("change"));
  expect(listener1).toBeCalledTimes(1);
  expect(listener1).toBeCalledTimes(1);

  information.removeEventListener("change", listener1, false);
  information.dispatchEvent(new Event("change"));
  expect(listener1).toBeCalledTimes(1);
  expect(listener2).toBeCalledTimes(2);
});

test("应在 listener 参数中包含当前状态", done => {
  const information = new NetworkInformation();

  information.addEventListener("change", event => {
    const target = event.target as NetworkInformation;
    expect(target.type).toBe("wifi");
    done();
  });

  information.dispatchEvent(new Event("change"));
});
