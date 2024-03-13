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
  public downlink: number
  public downlinkMax: number
  public effectiveType: EffectiveConnectionType
  public rtt: number
  public saveData: boolean
  public type: ConnectionType
  public onchange: EventListener | null = null

  public constructor(preset: ConnectionInfo) {
    super()
    this.downlink = preset.downlink
    this.downlinkMax = preset.downlinkMax
    this.effectiveType = preset.effectiveType
    this.rtt = preset.rtt
    this.saveData = preset.saveData
    this.type = preset.type
  }

  public dispatchEvent(event: Event) {
    if (event.type === 'change') {
      this.onchange?.({ ...event, currentTarget: this, target: this })
    }
    return super.dispatchEvent(event)
  }
}
