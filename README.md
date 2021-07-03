# jest-network-mock

Network api mock for jest

![npm](https://img.shields.io/npm/v/jest-network-mock?logo=npm&style=for-the-badge)
![CI](https://img.shields.io/github/workflow/status/nodoccat/jest-network-mock/CI?label=CI&logo=github&style=for-the-badge)
![COVERAGE](https://img.shields.io/codecov/c/github/nodoccat/jest-network-mock?logo=codecov&style=for-the-badge)

## Install

```shell
npm install -D jest-network-mock
```

## Use

```js
import { NetworkMock } from "jest-network-mock";

test("test", () => {
  NetworkMock.mock();
  // ...
  NetworkMock.dispatch({ effectiveType: "4g", type: "bluetooth" });
  // ...
  NetworkMock.clean();
});
```

## Default State

| name          | value |
| ------------- | ----- |
| downlink      | 1.45  |
| downlinkMax   | 10    |
| effectiveType | 4g    |
| rtt           | 300   |
| saveData      | false |
| type          | wifi  |

## Reference & Thanks

- [jsdom/jsdom](https://github.com/jsdom/jsdom)
- [dyakovk/jest-matchmedia-mock](https://github.com/dyakovk/jest-matchmedia-mock)
- [network-information-types](https://github.com/lacolaco/network-information-types)
