# jest-network-mock

用于 Jest 的 NetworkInformation API 模拟

[English](./README.md) | [简体中文](./README.zh-CN.md)

![npm](https://img.shields.io/npm/v/jest-network-mock?logo=npm&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/nodoccat/jest-network-mock/ci.yml?label=CI&logo=github-actions&logoColor=white&style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/nodoccat/jest-network-mock?logo=codecov&style=for-the-badge)

## 安装

```bash
pnpm add -D jest-network-mock
```

## 示例

```typescript
import { enableMock, disableMock, dispatch } from 'jest-network-mock'

beforeEach(() => enableMock())
afterEach(() => disableMock())

test('example', done => {
  navigator.connection.addEventListener('change', () => {
    done()
  })

  dispatch({ effectiveType: '4g' })
})
```

## API

### enableMock

启用 `navigator.connection` 模拟

```typescript
type enableMock = (preset?: ConnectionInfo) => void
```

你可以使用 `preset` 设置 `navigator.connection` 的初始状态，默认使用 `PRESET_4G`

### disableMock

禁用 `navigator.connection` 模拟

```typescript
type disableMock = () => void
```

### dispatch

修改 `navigator.connection` 状态并触发 `change` 事件

```typescript
type dispatch = (state?: Partial<ConnectionInfo>) => boolean
```

你也可以在这里使用预设

## 预设

我们提供了一些预设，你可以在调用 `enableMock` 和 `dispatch` 时使用：

|               | PRESET_4G | PRESET_FAST_3G | PRESET_SLOW_3G | PRESET_OFFLINE |
|---------------|-----------|----------------|----------------|----------------|
| downlink      | 10        | 1.3            | 0.35           | 0              |
| downlinkMax   | 20        | 2.6            | 0.7            | 0              |
| effectiveType | `4g`      | `3g`           | `3g`           | `4g`           |
| rtt           | 250       | 500            | 1850           | 0              |
| saveData      | false     | false          | false          | false          |
| type          | `wifi`    | `wifi`         | `wifi`         | `none`         |

## 参考与感谢

- [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock)
- [network-information-types](https://github.com/lacolaco/network-information-types)
