
export interface FormData {
  cell: CellData;
  subscriber: SubscriberData;
  userPlane: UserPlaneData;
  traffic: TrafficData;
  mobility: MobilityData;
  settings: SettingsData;
}

export interface CellData {
  ratType: "4G" | "5G:SA" | "5G:NSA";
  mobility: "Yes" | "No";
  cells: CellConfigData[];
}

export interface CellConfigData {
  id: string;
  cellType: "4G" | "5G" | "LTE";
  duplexMode: "FDD" | "TDD";
  band: string;
  dlEarfcn: string;
  ulEarfcn: string;
  ssbNrArfcn?: string;
}

export interface SubscriberData {
  totalUEs: number;
  ranges: SubscriberRangeData[];
}

export interface SubscriberRangeData {
  id: string;
  numberOfUEs: number;
  servingCell: string;
  startingSUPI: string;
  sharedKey: string;
  mncDigits: string;
}

export interface UserPlaneData {
  profileType: "Single" | "Mixed";
  profiles: UserPlaneProfileData[];
}

export interface UserPlaneProfileData {
  id: string;
  subscriberRange: string;
  dataType: "IPERF" | "VOLTE/VILTE";
  transportProtocol?: "TCP" | "UDP";
  callType?: "Video" | "Audio";
  startingPort: string;
  apnName: string;
  startDelay: string;
  duration: string;
  dataDirection: "Both" | "Downlink" | "Uplink";
  dlBitrate?: string;
  dlBitrateUnit?: "Mbps" | "Kbps";
  ulBitrate?: string;
  ulBitrateUnit?: "Mbps" | "Kbps";
}

export interface TrafficData {
  profileRange: string;
  attachType: "Bursty" | "Staggered";
  attachRate: string;
  attachDelay: string;
  powerOnDuration: string;
  staggerTime?: string;
}

export interface MobilityData {
  ueGroup: string;
  tripType: "Bidirectional" | "Stationary" | "Unidirectional";
  delay: string;
  duration: string;
  waitTime: string;
}

export interface SettingsData {
  testCaseName: string;
  logSetting: "debug" | "error" | "rrc_debug";
  successSettings: "new21" | "Bler Success" | "Throughput Success";
}
