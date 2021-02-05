import { NetworkMock } from "./index";

describe("NetworkMock", () => {
  it("mock 和清理", () => {
    expect("connection" in navigator).toBeFalsy();

    const { clean } = NetworkMock.mock();
    expect("connection" in navigator).toBeTruthy();

    clean();
    expect("connection" in navigator).toBeFalsy();
  });
});
