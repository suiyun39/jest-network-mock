import { NetworkInformation } from "./NetworkInformation";

declare global {
  // eslint-disable-next-line
  interface Navigator extends NavigatorNetworkInformation {}

  // eslint-disable-next-line
  interface WorkerNavigator extends NavigatorNetworkInformation {}

  interface NavigatorNetworkInformation {
    connection?: NetworkInformation;
  }
}
