export default class URLLoader {
  private urlToPromise: Record<string, Promise<string>> = {};
  public load(url: string): Promise<string> {
    if (typeof this.urlToPromise[url] === 'undefined') {
      this.urlToPromise[url] = new Promise<string>((resolve, reject) => {
        fetch(url).then((response) => {
          response.text().then(resolve).catch(reject);
        }).catch(reject);
      });
    }
    return this.urlToPromise[url];
  }
}
