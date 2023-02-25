# jest-network-mock

NetworkInformation API mock for Jest

[English](./README.md) | [简体中文](./README.zh-CN.md)

![npm](https://img.shields.io/npm/v/jest-network-mock?logo=npm&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/nodoccat/jest-network-mock/ci.yml?label=CI&logo=github-actions&logoColor=white&style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/nodoccat/jest-network-mock?logo=codecov&style=for-the-badge)

## Installation

```bash
pnpm add -D jest-network-mock
```

## Example

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

Enable mock for `navigator.connection`

```typescript
type enableMock = (preset?: ConnectionInfo) => void
```

You can set `navigator.connection` initial state with `preset`, By default use `PRESET_4G`

### disableMock

Disable mock for `navigator.connection`

```typescript
type disableMock = () => void
```

### dispatch

Change `navigator.connection` state and trigger `change` event

```typescript
type dispatch = (state?: Partial<ConnectionInfo>) => boolean
```

You can also use preset here

## Preset

We have some presets for you, you can use it when call `enableMock` and `dispatch`:

|               | PRESET_4G | PRESET_FAST_3G | PRESET_SLOW_3G | PRESET_OFFLINE |
|---------------|-----------|----------------|----------------|----------------|
| downlink      | 10        | 1.3            | 0.35           | 0              |
| downlinkMax   | 20        | 2.6            | 0.7            | 0              |
| effectiveType | `4g`      | `3g`           | `3g`           | `4g`           |
| rtt           | 250       | 500            | 1850           | 0              |
| saveData      | false     | false          | false          | false          |
| type          | `wifi`    | `wifi`         | `wifi`         | `none`         |

## Reference & Thanks

- [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock)
- [network-information-types](https://github.com/lacolaco/network-information-types)
