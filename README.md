# jest-network-mock

Network api mock for jest

**This is a beta version. Please wait for 1.x**

![npm](https://img.shields.io/npm/v/jest-network-mock?logo=npm&style=for-the-badge)
![CI](https://img.shields.io/github/workflow/status/nodoccat/jest-network-mock/CI?label=CI&logo=github&style=for-the-badge)
![code quality](https://img.shields.io/codacy/grade/2e75b66dc8ca44b6a3a2d6c5ca3755e5?logo=codacy&style=for-the-badge)
![coverage](https://img.shields.io/codacy/coverage/2e75b66dc8ca44b6a3a2d6c5ca3755e5?logo=codacy&style=for-the-badge)

## Install

```shell
npm install -D jest-network-mock
```

## Use

```js
import { NetworkMock } from "jest-network-mock";

test("test", () => {
  const { clean, dispatch } = NetworkMock.mock();
  // ...
  dispatch({ effectiveType: "4g", type: "bluetooth" });
  // ...
  clean();
});
```

## Reference & Thanks

- [jsdom/jsdom](https://github.com/jsdom/jsdom)
- [dyakovk/jest-matchmedia-mock](https://github.com/dyakovk/jest-matchmedia-mock)
