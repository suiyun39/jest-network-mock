import { NetworkInformation } from "./NetworkInformation";
import { NetworkEvent } from "./NetworkEvent";

describe("NetworkEvent", () => {
  it("target 检查", () => {
    const networkInfo = new NetworkInformation();
    const event = new NetworkEvent("change", networkInfo);

    expect(event.type).toBe("change");
    expect(event.currentTarget).toBe(networkInfo);
    expect(event.srcElement).toBe(networkInfo);
    expect(event.target).toBe(networkInfo);
  });
});
