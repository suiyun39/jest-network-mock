import { ConnectionInfo } from './NetworkInformation'

export const PRESET_4G: ConnectionInfo = {
  downlink: 10,
  downlinkMax: 20,
  effectiveType: '4g',
  rtt: 250,
  saveData: false,
  type: 'wifi',
}

export const PRESET_FAST_3G: ConnectionInfo = {
  downlink: 1.3,
  downlinkMax: 2.6,
  effectiveType: '3g',
  rtt: 500,
  saveData: false,
  type: 'wifi',
}

export const PRESET_SLOW_3G: ConnectionInfo = {
  downlink: 0.35,
  downlinkMax: 0.7,
  effectiveType: '3g',
  rtt: 1850,
  saveData: false,
  type: 'wifi',
}

export const PRESET_OFFLINE: ConnectionInfo = {
  downlink: 0,
  downlinkMax: 0,
  effectiveType: '4g',
  rtt: 0,
  saveData: false,
  type: 'none',
}
