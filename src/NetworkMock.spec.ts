import { NetworkMock } from "./NetworkMock";
import { NetworkInformation } from "./NetworkInformation";

test("应能正确执行 mock 和清理", () => {
  expect("connection" in navigator).toBeFalsy();

  NetworkMock.mock();
  expect("connection" in navigator).toBeTruthy();

  NetworkMock.clean();
  expect("connection" in navigator).toBeFalsy();
});

test("应在执行 dispatch 后改变网络状态", done => {
  NetworkMock.mock();

  navigator.connection?.addEventListener("change", event => {
    const target = event.target as NetworkInformation;
    expect(target.downlink).toBe(5);
    expect(target.downlinkMax).toBe(10);
    expect(target.effectiveType).toBe("4g");
    expect(target.rtt).toBe(500);
    expect(target.saveData).toBe(true);
    expect(target.type).toBe("bluetooth");

    NetworkMock.clean();
    done();
  });

  NetworkMock.dispatch({
    downlink: 5,
    downlinkMax: 10,
    effectiveType: "4g",
    rtt: 500,
    saveData: true,
    type: "bluetooth",
  });
});
