import {MapData} from './map_data';

export class MemoryDataLoader {
  private mapLoadPromise: Record<string, Promise<any>> = {};
  private loadedMaps: Record<string, any> = {};

  private mapLoadResolvers: Record<string, (val: any) => void> = {};

  public constructor() {}


  public setMapDataLoaded(mapName: string, data: any): void {
    this.getAnyMapData(mapName); // Ensure the resolver has been initialized.
    this.mapLoadResolvers[mapName](data);
  }

  public getAnyMapData(mapName: string): Promise<Record<string, unknown> | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getMapData(mapName as any);
  }

  public getMapData<K extends keyof MapData>(mapName: K): Promise<MapData[K] | null> {
    if (!this.mapLoadPromise[mapName]) {
      this.mapLoadPromise[mapName] = new Promise((resolve) => {
        this.mapLoadResolvers[mapName] = (data) => {
          delete this.mapLoadResolvers[mapName];
          this.loadedMaps[mapName] = data;
          resolve(data);
        };
      });
    }
    return this.mapLoadPromise[mapName];
  }

  public getMapDataSync<K extends keyof MapData>(mapName: K): MapData[K] | null {
    return this.loadedMaps[mapName];
  }
}
