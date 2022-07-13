import {MapData} from './map_data';

export class UrlDataLoader {
  public baseUrl!: string;
  private mapLoadPromise: Record<string, Promise<any>> = {};
  private loadedMaps: Record<string, any> = {};
  private jsonRequestHelper!: (url: string) => Promise<any>;
  private waitingFor: Promise<unknown> | null = null;

  /**
   * @param baseUrl String containing {MapName}, like
   * "https://s3-us-west-2.amazonaws.com/frogtown.apricot.data/{MapName}.json"
   */
  public constructor(baseUrl: string, jsonRequestHelper: (url: string) => Promise<any>) {
    this.baseUrl = baseUrl;
    this.jsonRequestHelper = jsonRequestHelper;
  }

  public getAnyMapData(mapName: string): Promise<Record<string, unknown> | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getMapData(mapName as any);
  }

  public async getMapData<K extends keyof MapData>(mapName: K): Promise<MapData[K] | null> {
    if (this.waitingFor) {
      await this.waitingFor;
    }
    if (!this.mapLoadPromise[mapName]) {
      this.mapLoadPromise[mapName] = new Promise((resolve) => {
        this.jsonRequestHelper(this.baseUrl.replace(/\{MapName\}/g, mapName)).then((result) => {
          this.loadedMaps[mapName] = result;
          resolve(result);
        });
      });
    }
    return await this.mapLoadPromise[mapName];
  }

  public getMapDataSync<K extends keyof MapData>(mapName: K): MapData[K] | null {
    return this.loadedMaps[mapName];
  }

  public holdUntil(until: Promise<unknown>): void {
    this.waitingFor = until;
  }
}
