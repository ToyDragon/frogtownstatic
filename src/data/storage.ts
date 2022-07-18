import Debouncer, {Unloadable} from './debouncer';

export interface FrogtownStorage {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, force?: boolean) => Promise<unknown>;
  createDir: (name: string) => Promise<FrogtownStorage | null>;
  isBig: boolean;
}

export function createLocalStorage(): FrogtownStorage {
  return {
    get: async (key: string) => localStorage.getItem(key),
    set: async (key: string, value: string) => localStorage.setItem(key, value),
    createDir: (_name: string) => Promise.resolve(null),
    isBig: false,
  };
}

export function createDirectoryStorage(folder: FileSystemDirectoryHandle, unloadable: Unloadable): FrogtownStorage {
  const lastKnownValue: Record<string, string | null> = {};
  let pendingValues: Record<string, string> = {};
  let pendingResolvers: ((result: boolean) => void)[] = [];
  const debouncer = new Debouncer(2000, unloadable);

  async function trySaveToDisk(force?: boolean) {
    if ((force && await debouncer.forceAct()) || await debouncer.waitAndShouldAct()) {
      let result = false;
      try {
        console.log('Writing batch keys', Object.keys(pendingValues));
        await Promise.all(Object.keys(pendingValues).map(async (key) => {
          const writable = await (await folder.getFileHandle(key, {create: true}))
              .createWritable({keepExistingData: false});
          await writable.write(pendingValues[key]);
          await writable.close();
        }));
        result = true;
      } catch {}
      pendingValues = {};
      for (const resolver of pendingResolvers) {
        resolver(result);
      }
      pendingResolvers = [];
    }
  }

  return {
    get: async (key: string) => {
      try {
        if (lastKnownValue[key]) {
          return lastKnownValue[key];
        }
        const file = await (await folder.getFileHandle(key)).getFile();
        const value = await file.text();
        lastKnownValue[key] = value;
        return value;
      } catch {}
      return null;
    },
    set: async (key: string, value: string, force?: boolean) => {
      if (force || value !== lastKnownValue[key]) {
        lastKnownValue[key] = value;
        pendingValues[key] = value;
        const writePromise = new Promise<boolean>((resolve) => {
          pendingResolvers.push(resolve);
        });
        trySaveToDisk(force);
        return await writePromise;
      }

      console.log('Skipping write of duplicate info for key ', key);
      return true;
    },
    createDir: async (name: string) => {
      return createDirectoryStorage(await folder.getDirectoryHandle(name, {create: true}), unloadable);
    },
    isBig: false,
  };
}
