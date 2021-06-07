import { NetworkInformation } from "./information";

test("应正确初始化预设值", () => {
  const information = new NetworkInformation();

  expect(information.downlink).toBe(1.45);
  expect(information.downlinkMax).toBe(10);
  expect(information.effectiveType).toBe("4g");
  expect(information.rtt).toBe(300);
  expect(information.saveData).toBe(false);
  expect(information.type).toBe("wifi");
});

test("应正确处理事件注册, 移除和触发", () => {
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

test("应在事件回调中包含当前网络状态", done => {
  const information = new NetworkInformation();

  information.addEventListener("change", event => {
    const target = event.target as NetworkInformation;
    expect(target.type).toBe("wifi");
    done();
  });

  information.dispatchEvent(new Event("change"));
});

test("应在 change 事件触发时触发 onchange 属性绑定的函数", done => {
  const information = new NetworkInformation();

  information.onchange = event => {
    const target = event.target as NetworkInformation;
    expect(event.type).toBe("change");
    expect(target.type).toBe("wifi");
    done();
  };

  information.dispatchEvent(new Event("change"));
});
