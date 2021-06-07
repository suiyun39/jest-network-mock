import { NetworkMock } from "./mock";
import { NetworkInformation } from "./information";

afterEach(() => {
  NetworkMock.clean();
});

test("应正确添加和移除 navigator.connection", () => {
  expect("connection" in navigator).toBeFalsy();

  NetworkMock.mock();
  expect("connection" in navigator).toBeTruthy();

  NetworkMock.clean();
  expect("connection" in navigator).toBeFalsy();
});

test("应在执行 dispatch 方法时触发注册的事件", done => {
  NetworkMock.mock();

  navigator.connection?.addEventListener("change", evt => {
    const target = evt.target as NetworkInformation;
    expect(target.downlink).toBe(1.45);
    expect(target.downlinkMax).toBe(10);
    expect(target.effectiveType).toBe("4g");
    expect(target.rtt).toBe(300);
    expect(target.saveData).toBe(false);
    expect(target.type).toBe("wifi");

    NetworkMock.clean();
    done();
  });

  NetworkMock.dispatch();
});

test("应在执行 dispatch 方法时正确更新状态值", done => {
  NetworkMock.mock();

  navigator.connection?.addEventListener("change", event => {
    const target = event.target as NetworkInformation;
    expect(target.downlink).toBe(5);
    expect(target.downlinkMax).toBe(20);
    expect(target.effectiveType).toBe("3g");
    expect(target.rtt).toBe(500);
    expect(target.saveData).toBe(true);
    expect(target.type).toBe("bluetooth");

    NetworkMock.clean();
    done();
  });

  NetworkMock.dispatch({
    downlink: 5,
    downlinkMax: 20,
    effectiveType: "3g",
    rtt: 500,
    saveData: true,
    type: "bluetooth",
  });
});

test("应在重复 mock 时抛出异常", () => {
  const runner = () => {
    NetworkMock.mock();
    NetworkMock.mock();
  };

  expect(runner).toThrow("navigator.connection is defined");
});

test("应在执行 dispatch 时检查 mock 状态", () => {
  const runner = () => {
    NetworkMock.clean();
    NetworkMock.dispatch();
  };

  expect(runner).toThrow("navigator.connection is not defined");
});
