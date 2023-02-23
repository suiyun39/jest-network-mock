export type EffectiveConnectionType = 'slow-2g' | '2g' | '3g' | '4g'
export type ConnectionType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'

export interface ConnectionInfo {
  downlink: number
  downlinkMax: number
  effectiveType: EffectiveConnectionType
  rtt: number
  saveData: boolean
  type: ConnectionType
}
