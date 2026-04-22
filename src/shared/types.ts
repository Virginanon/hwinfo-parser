export interface RawData {
  [key: string]: {
    [key: string]: { value: number; units: string }[];
  };
}
