import { afterEach, test, expect, jest } from '@jest/globals'
import { disableMock, dispatch, enableMock, type NetworkInformation, PRESET_OFFLINE } from '../src'

interface Navigator {
  connection: NetworkInformation
}

declare const navigator: Navigator

afterEach(() => disableMock())

test('应正确添加和删除 navigator.connection', () => {
  enableMock()
  expect('connection' in navigator).toBe(true)

  disableMock()
  expect('connection' in navigator).toBe(false)
})

test('使用预设时应正确设置状态', () => {
  enableMock(PRESET_OFFLINE)

  expect(navigator.connection.downlink).toBe(PRESET_OFFLINE.downlink)
  expect(navigator.connection.downlinkMax).toBe(PRESET_OFFLINE.downlinkMax)
  expect(navigator.connection.effectiveType).toBe(PRESET_OFFLINE.effectiveType)
  expect(navigator.connection.rtt).toBe(PRESET_OFFLINE.rtt)
  expect(navigator.connection.saveData).toBe(PRESET_OFFLINE.saveData)
  expect(navigator.connection.type).toBe(PRESET_OFFLINE.type)
})

test('应在 dispatch 时更新状态并触发事件', done => {
  enableMock()

  navigator.connection.addEventListener('change', evt => {
    const target = evt.target as NetworkInformation
    expect(target.downlink).toBe(PRESET_OFFLINE.downlink)
    expect(target.downlinkMax).toBe(PRESET_OFFLINE.downlinkMax)
    expect(target.effectiveType).toBe(PRESET_OFFLINE.effectiveType)
    expect(target.rtt).toBe(PRESET_OFFLINE.rtt)
    expect(target.saveData).toBe(PRESET_OFFLINE.saveData)
    expect(target.type).toBe(PRESET_OFFLINE.type)
    done()
  })

  dispatch(PRESET_OFFLINE)
})

test('应在 dispatch 时触发 onchange', done => {
  enableMock()

  navigator.connection.onchange = () => done()
  dispatch()
})

test('未启用 mock 时执行 dispatch 应提示错误', () => {
  console.error = jest.fn()
  disableMock()

  dispatch()
  expect(console.error).toBeCalledWith('Please enable mock first.')
})
