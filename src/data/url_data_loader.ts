import {CardIDMap, MapData} from './map_data';

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
      this.mapLoadPromise[mapName] = new Promise(async (resolve) => {
        // Special handling for some maps that can be constructed from other maps.
        if (mapName === 'IDToNormalImageURI' || mapName === 'IDToCropImageURI') {
          return this.getMapData('IDToLargeImageURI').then((largeMap) => {
            if (!largeMap) {
              this.loadedMaps[mapName] = null;
              resolve(null);
            } else {
              const mapData: CardIDMap<string> = {};
              for (const id of Object.keys(largeMap)) {
                const replacement = mapName === 'IDToNormalImageURI' ? 'normal' : 'art_crop';
                mapData[id] = largeMap[id].replace(/io\/large/g, 'io/' + replacement);
              }
              this.loadedMaps[mapName] = mapData;
              (window as any).maps = (window as any).maps || {};
              (window as any).maps[mapName] = mapData;
              console.log('Loaded ' + mapName + ' as derivative');
              resolve(mapData);
            }
          });
        } else if (mapName === 'IDToCMC') {
          return this.getMapData('IDToCost').then(async (costMap) => {
            // eslint-disable-next-line max-len
            const idToCMCAbv: Record<string, number> = await this.jsonRequestHelper(this.baseUrl.replace(/\{MapName\}/g, 'IDToCMC'));
            console.log(`${Object.keys(costMap!).length} vs ${Object.keys(idToCMCAbv).length}`);
            if (!costMap) {
              this.loadedMaps[mapName] = null;
              resolve(null);
            } else {
              const mapData: CardIDMap<number> = {};
              for (const id of Object.keys(costMap)) {
                const cost = costMap[id] || '';
                // Logic must match the exported exactly.
                mapData[id] = cost === '' ? 0 : cost.split(' //')[0].split('}{')
                    .map((c) => c.replace(/[\{\}]/g, ''))
                    .map((c) => c === 'X' || c === '0' ? 0 : (Number.parseInt(c) || 1))
                    .reduce((c, v) => c + v);
              }
              for (const id of Object.keys(idToCMCAbv)) {
                mapData[id] = idToCMCAbv[id];
              }
              this.loadedMaps[mapName] = mapData;
              (window as any).maps = (window as any).maps || {};
              (window as any).maps[mapName] = mapData;
              (window as any).maps[mapName + '_abv'] = idToCMCAbv;
              console.log('Loaded ' + mapName + ' as derivative');
              resolve(mapData);
            }
          });
        }

        // All other maps load directly from url.
        this.jsonRequestHelper(this.baseUrl.replace(/\{MapName\}/g, mapName)).then((result) => {
          this.loadedMaps[mapName] = result;
          (window as any).maps = (window as any).maps || {};
          (window as any).maps[mapName] = result;
          console.log('Loaded ' + mapName);
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
