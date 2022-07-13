import {MapData} from './map_data';

export class MemoryDataLoader {
  private mapLoadPromise: Record<string, Promise<any>> = {};
  private loadedMaps: Record<string, any> = {};
  private mapLoadResolvers: Record<string, (val: any) => void> = {};
  private waitingFor: Promise<unknown> | null = null;

  public constructor() {}

  private initMapLoadPromise(mapName: string): void {
    if (!this.mapLoadPromise[mapName]) {
      this.mapLoadPromise[mapName] = new Promise((resolve) => {
        this.mapLoadResolvers[mapName] = (data) => {
          delete this.mapLoadResolvers[mapName];
          this.loadedMaps[mapName] = data;
          resolve(data);
        };
      });
    }
  }

  public setMapDataLoaded(mapName: string, data: any): void {
    this.initMapLoadPromise(mapName);
    this.mapLoadResolvers[mapName](data);
  }

  public getAnyMapData(mapName: string): Promise<Record<string, unknown> | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getMapData(mapName as any);
  }

  public async getMapData<K extends keyof MapData>(mapName: K): Promise<MapData[K] | null> {
    if (this.waitingFor) {
      await this.waitingFor;
    }
    this.initMapLoadPromise(mapName);
    return await this.mapLoadPromise[mapName];
  }

  public getMapDataSync<K extends keyof MapData>(mapName: K): MapData[K] | null {
    return this.loadedMaps[mapName];
  }

  public holdUntil(until: Promise<unknown>): void {
    this.waitingFor = until;
  }
}
