import {MapData} from './map_data';

export interface DataLoader {
  holdUntil(until: Promise<unknown>): void;
  getMapData<K extends keyof MapData>(mapName: K): Promise<MapData[K] | null>;
  getAnyMapData(mapName: string): Promise<Record<string, unknown> | null>;
  getMapDataSync<K extends keyof MapData>(mapName: K): MapData[K] | null;
}
