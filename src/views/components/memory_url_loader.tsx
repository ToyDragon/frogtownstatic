// TODO: move this to data, use interface.
export default class MemoryURLLoader {
  private urlToResolver: Record<string, (data: string) => void> = {};
  private urlToPromise: Record<string, Promise<string>> = {};
  public load(url: string): Promise<string> {
    if (typeof this.urlToPromise[url] === 'undefined') {
      this.urlToPromise[url] = new Promise<string>((resolve) => {
        this.urlToResolver[url] = resolve;
      });
    }
    return this.urlToPromise[url];
  }

  public setLoaded(url: string, data: string): void {
    if (this.urlToResolver[url]) {
      this.urlToResolver[url](data);
    } else {
      this.urlToPromise[url] = Promise.resolve(data);
    }
  }
}
