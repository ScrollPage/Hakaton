export interface IDetectorData {
  id: number;
  timestamp: string;
  min_timestamp: string;
  temp: number;
  humidity: number;
  lightning: number;
  pH: number;
}

export interface IDetector {
  id: number;
}

