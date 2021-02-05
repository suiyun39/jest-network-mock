import { NetworkInformation } from "./NetworkInformation";

export class NetworkEvent {
  // Event 对象属性
  readonly bubbles = false;
  readonly cancelBubble = false;
  readonly cancelable = false;
  readonly composed = false;
  readonly defaultPrevented = false;
  readonly eventPhase = 0;
  readonly isTrusted = true;
  readonly path = [];
  readonly returnValue = true;
  readonly timeStamp = 50000;

  // 属性重写
  readonly currentTarget: NetworkInformation;
  readonly srcElement: NetworkInformation;
  readonly target: NetworkInformation;
  readonly type: string;

  constructor(type: string, target: NetworkInformation) {
    this.currentTarget = target;
    this.srcElement = target;
    this.target = target;
    this.type = type;
  }
}
