import { MapData } from "./map_data";

export class UrlDataLoader {
  public baseUrl!: string;
  private mapLoadPromise: Record<string, Promise<any>> = {};
  private loadedMaps: Record<string, any> = {};

  /**
   * @param baseUrl String containing {MapName}, like
   * "https://s3-us-west-2.amazonaws.com/frogtown.apricot.data/{MapName}.json"
   */
  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getAnyMapData(mapName: string): Promise<Record<string, unknown> | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getMapData(mapName as any);
  }

  public getMapData<K extends keyof MapData>(mapName: K): Promise<MapData[K] | null> {
    if (!this.mapLoadPromise[mapName]) {
      this.mapLoadPromise[mapName] = new Promise((resolve) => {
        fetch(this.baseUrl.replace(/\{MapName\}/g, mapName)).then((response) => {
          response.json().then((jsonResponse) => {
            this.loadedMaps[mapName] = jsonResponse;
            resolve(jsonResponse);
          });
        });
      });
    }
    return this.mapLoadPromise[mapName];
  }

  public getMapDataSync<K extends keyof MapData>(mapName: K): MapData[K] | null {
    return this.loadedMaps[mapName];
  }
}