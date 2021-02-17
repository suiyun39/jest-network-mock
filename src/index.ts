import { NetworkInformation } from "./NetworkInformation";

export * from "./NetworkInformation";
export * from "./NetworkMock";

declare global {
  // eslint-disable-next-line
  interface Navigator extends NavigatorNetworkInformation {}

  // eslint-disable-next-line
  interface WorkerNavigator extends NavigatorNetworkInformation {}

  interface NavigatorNetworkInformation {
    connection?: NetworkInformation;
  }
}
