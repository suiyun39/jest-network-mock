import { NetworkMock } from "./index";

describe("NetworkMock", () => {
  it("mock 和清理", () => {
    expect("connection" in navigator).toBeFalsy();

    NetworkMock.mock();
    expect("connection" in navigator).toBeTruthy();

    NetworkMock.clean();
    expect("connection" in navigator).toBeFalsy();
  });

  it("dispatch", done => {
    const { dispatch } = NetworkMock.mock();

    navigator.connection?.addEventListener("change", event => {
      expect(event.target.downlink).toBe(5);
      expect(event.target.downlinkMax).toBe(10);
      expect(event.target.effectiveType).toBe("4g");
      expect(event.target.rtt).toBe(500);
      expect(event.target.saveData).toBe(true);
      expect(event.target.type).toBe("bluetooth");

      NetworkMock.clean();
      done();
    });

    dispatch({
      downlink: 5,
      downlinkMax: 10,
      effectiveType: "4g",
      rtt: 500,
      saveData: true,
      type: "bluetooth",
    });
  });
});
