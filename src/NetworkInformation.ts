import { PRESET_4G } from './preset'

type EffectiveConnectionType = 'slow-2g' | '2g' | '3g' | '4g'
type ConnectionType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'

export interface ConnectionInfo {
  downlink: number
  downlinkMax: number
  effectiveType: EffectiveConnectionType
  rtt: number
  saveData: boolean
  type: ConnectionType
}

export class NetworkInformation extends EventTarget implements ConnectionInfo {
  downlink = PRESET_4G.downlink
  downlinkMax = PRESET_4G.downlinkMax
  effectiveType = PRESET_4G.effectiveType
  rtt = PRESET_4G.rtt
  saveData = PRESET_4G.saveData
  type = PRESET_4G.type

  onchange: EventListener | null = null

  dispatchEvent (event: Event) {
    if (event.type === 'change') {
      this.onchange?.({ ...event, type: 'change', currentTarget: this, target: this })
    }
    return super.dispatchEvent(event)
  }
}
