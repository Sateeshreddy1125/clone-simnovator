
import { CellConfigData, FormData } from '@/types';

// Default values for 4G RAT Type
export const default4GCell: CellConfigData = {
  id: "cell1",
  cellType: "LTE",
  duplexMode: "FDD",
  band: "n1",
  dlEarfcn: "300",
  ulEarfcn: "18300",
};

// Default values for 5G RAT Type
export const default5GCell: CellConfigData = {
  id: "cell1",
  cellType: "5G",
  duplexMode: "FDD",
  band: "n1",
  dlEarfcn: "42800",
  ulEarfcn: "39000",
  ssbNrArfcn: "39000",
};

// Default values for 5G:NSA RAT Type (includes both 4G and 5G)
export const default5GNSACells: CellConfigData[] = [
  {
    id: "cell1",
    cellType: "4G",
    duplexMode: "FDD",
    band: "n1",
    dlEarfcn: "300",
    ulEarfcn: "18300",
  },
  {
    id: "cell2",
    cellType: "5G",
    duplexMode: "FDD",
    band: "n1",
    dlEarfcn: "42800",
    ulEarfcn: "39000",
    ssbNrArfcn: "39000",
  },
];

// FDD bands
export const fddBands = ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20", "n21"];

// TDD bands
export const tddBands = ["n22", "n23", "n24", "n25", "n26", "n27", "n28", "n29", "n30", "n31", "n32", "n33", "n34", "n35", "n36", "n37", "n38", "n39", "n40"];

// Band to EARFCN mapping for FDD
export const fddBandToEarfcn: Record<string, { dl: string; ul: string }> = {
  "n1": { dl: "300", ul: "18300" },
  "n2": { dl: "600", ul: "18600" },
  "n3": { dl: "1200", ul: "19200" },
  "n4": { dl: "1950", ul: "19950" },
  "n5": { dl: "2400", ul: "20400" },
  "n6": { dl: "2650", ul: "20650" },
  "n7": { dl: "2750", ul: "20750" },
  "n8": { dl: "3450", ul: "21450" },
  "n9": { dl: "3800", ul: "21800" },
  "n10": { dl: "4150", ul: "22150" },
  "n11": { dl: "4750", ul: "22750" },
  "n12": { dl: "5000", ul: "23000" },
  "n13": { dl: "5180", ul: "23180" },
  "n14": { dl: "5280", ul: "23280" },
  "n15": { dl: "5730", ul: "23730" },
  "n16": { dl: "5850", ul: "23850" },
  "n17": { dl: "5999", ul: "23999" },
  "n18": { dl: "6150", ul: "24150" },
  "n19": { dl: "6450", ul: "24450" },
  "n20": { dl: "6600", ul: "24600" },
  "n21": { dl: "6750", ul: "24750" },
};

// Band to EARFCN mapping for TDD
export const tddBandToEarfcn: Record<string, { dl: string; ul: string }> = {
  "n22": { dl: "7500", ul: "25500" },
  "n23": { dl: "7700", ul: "25700" },
  "n24": { dl: "8040", ul: "26040" },
  "n25": { dl: "8365", ul: "26365" },
  "n26": { dl: "8645", ul: "26645" },
  "n27": { dl: "9040", ul: "27040" },
  "n28": { dl: "9210", ul: "27210" },
  "n29": { dl: "9660", ul: "27660" },
  "n30": { dl: "9770", ul: "27770" },
  "n31": { dl: "9870", ul: "27870" },
  "n32": { dl: "9919", ul: "27919" },
  "n33": { dl: "36000", ul: "36000" },
  "n34": { dl: "36200", ul: "36200" },
  "n35": { dl: "36350", ul: "36350" },
  "n36": { dl: "36950", ul: "36950" },
  "n37": { dl: "37550", ul: "37550" },
  "n38": { dl: "37750", ul: "37750" },
  "n39": { dl: "38250", ul: "38250" },
  "n40": { dl: "38650", ul: "38650" },
};

// Band to NR-ARFCN mapping for 5G
export const bandToNrArfcn: Record<string, { dl: string; ul: string; ssb: string }> = {
  "n1": { dl: "42800", ul: "39000", ssb: "39000" },
  "n2": { dl: "43400", ul: "39600", ssb: "39600" },
  "n3": { dl: "44000", ul: "40200", ssb: "40200" },
  "n4": { dl: "44600", ul: "40800", ssb: "40800" },
  "n5": { dl: "45200", ul: "41400", ssb: "41400" },
  "n6": { dl: "45800", ul: "42000", ssb: "42000" },
  "n7": { dl: "46400", ul: "42600", ssb: "42600" },
  "n8": { dl: "47000", ul: "43200", ssb: "43200" },
  // Additional bands for 5G
  "n34": { dl: "403500", ul: "403500", ssb: "403500" },
  "n38": { dl: "514000", ul: "514000", ssb: "514000" },
  "n39": { dl: "376000", ul: "376000", ssb: "376000" },
  "n40": { dl: "460000", ul: "460000", ssb: "460000" },
};

// Default initial form data
export const defaultFormData: FormData = {
  cell: {
    ratType: "4G",
    mobility: "No",
    cells: [default4GCell],
  },
  subscriber: {
    totalUEs: 1,
    ranges: [
      {
        id: "range1",
        numberOfUEs: 1,
        servingCell: "cell1",
        startingSUPI: "001010123456001",
        sharedKey: "00112233445566778899aabbccddeeff",
        mncDigits: "2",
      },
    ],
  },
  userPlane: {
    profileType: "Single",
    profiles: [
      {
        id: "profile1",
        subscriberRange: "range1",
        dataType: "IPERF",
        transportProtocol: "TCP",
        startingPort: "5000",
        apnName: "",
        startDelay: "5",
        duration: "600",
        dataDirection: "Both",
        dlBitrate: "150",
        dlBitrateUnit: "Mbps",
        ulBitrate: "50",
        ulBitrateUnit: "Mbps",
      },
    ],
  },
  traffic: {
    profileRange: "ApplyToAll",
    attachType: "Bursty",
    attachRate: "1",
    attachDelay: "0",
    powerOnDuration: "605",
    staggerTime: "0",
  },
  mobility: {
    ueGroup: "Apply to All",
    tripType: "Bidirectional",
    delay: "5",
    duration: "600",
    waitTime: "0",
  },
  settings: {
    testCaseName: "",
    logSetting: "debug",
    successSettings: "new21",
  },
  currentStep: 0,
};

// Options for various dropdowns
export const ratTypeOptions = [
  { label: "4G", value: "4G" },
  { label: "5G:SA", value: "5G:SA" },
  { label: "5G:NSA", value: "5G:NSA" },
];

export const mobilityOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const duplexModeOptions = [
  { label: "FDD", value: "FDD" },
  { label: "TDD", value: "TDD" },
];

export const dataTypeOptions = [
  { label: "IPERF", value: "IPERF" },
  { label: "VOLTE/VILTE", value: "VOLTE/VILTE" },
];

export const transportProtocolOptions = [
  { label: "TCP", value: "TCP" },
  { label: "UDP", value: "UDP" },
];

export const callTypeOptions = [
  { label: "Video", value: "Video" },
  { label: "Audio", value: "Audio" },
];

export const dataDirectionOptions = [
  { label: "Both", value: "Both" },
  { label: "Downlink", value: "Downlink" },
  { label: "Uplink", value: "Uplink" },
];

export const bitRateUnitOptions = [
  { label: "Mbps", value: "Mbps" },
  { label: "Kbps", value: "Kbps" },
];

export const attachTypeOptions = [
  { label: "Bursty", value: "Bursty" },
  { label: "Staggered", value: "Staggered" },
];

export const tripTypeOptions = [
  { label: "Bidirectional", value: "Bidirectional" },
  { label: "Stationary", value: "Stationary" },
  { label: "Unidirectional", value: "Unidirectional" },
];

export const logSettingOptions = [
  { label: "debug", value: "debug" },
  { label: "error", value: "error" },
  { label: "rrc_debug", value: "rrc_debug" },
];

export const successSettingsOptions = [
  { label: "new21", value: "new21" },
  { label: "Bler Success", value: "Bler Success" },
  { label: "Throughput Success", value: "Throughput Success" },
];
