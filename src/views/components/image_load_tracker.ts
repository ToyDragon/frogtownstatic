export default class ImageLoadTracker {
  private loadedUrls: Record<string, boolean> = {};
  public setURLIsLoaded(url: string): void {
    this.loadedUrls[url] = true;
  }
  public getURLIsLoaded(url: string): boolean {
    return this.loadedUrls[url] === true;
  }
}
