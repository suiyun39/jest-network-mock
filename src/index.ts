import { NetworkInformation, ConnectionInfo } from './NetworkInformation'
import { PRESET_4G } from './preset'

interface Navigator {
  connection?: NetworkInformation
}

declare const navigator: Navigator

export function enableMock (preset: ConnectionInfo = PRESET_4G) {
  navigator.connection = new NetworkInformation(preset)
}

export function disableMock () {
  delete navigator.connection
}

export function dispatch (state?: Partial<ConnectionInfo>) {
  if (!navigator.connection) {
    console.error('Please enable mock first.')
    return false
  }

  const target = navigator.connection
  target.downlink = state?.downlink ?? target.downlink
  target.downlinkMax = state?.downlinkMax ?? target.downlinkMax
  target.effectiveType = state?.effectiveType ?? target.effectiveType
  target.rtt = state?.rtt ?? target.rtt
  target.saveData = state?.saveData ?? target.saveData
  target.type = state?.type ?? target.type

  return target.dispatchEvent(new Event('change'))
}

export * from './NetworkInformation'
export * from './preset'
