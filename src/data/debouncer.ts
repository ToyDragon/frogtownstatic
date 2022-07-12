export default class Debouncer {
  private delay: number;
  private lastAction!: Date;
  private waiting = false;
  private inProgressRequest: ((shouldAct: boolean) => void) | null = null;

  public constructor(delay: number) {
    this.delay = delay;
    this.lastAction = new Date();
    this.lastAction.setFullYear(1990);

    document.addEventListener('onbeforeunload', () => {
      if (this.inProgressRequest) {
        this.inProgressRequest(true);
        this.inProgressRequest = null;
      }
    });
  }

  public forceAct(): void {
    if (this.inProgressRequest) {
      this.inProgressRequest(false);
      this.inProgressRequest = null;
    }
    this.waiting = false;
  }

  public waitAndShouldAct(): Promise<boolean> {
    if (this.inProgressRequest) {
      this.inProgressRequest(false);
    }
    return new Promise<boolean>((resolve) => {
      this.inProgressRequest = resolve;
      this.lastAction = new Date();
      this.tryWait();
    });
  }

  private tryWait(): void {
    if (!this.inProgressRequest) {
      return;
    }
    if (this.waiting) {
      return;
    }

    const ellapsedMillis = new Date().getTime() - this.lastAction.getTime();
    if (ellapsedMillis > this.delay) {
      this.inProgressRequest(true);
      this.inProgressRequest = null;
    } else {
      this.waiting = true;
      const remainingTime = this.delay - ellapsedMillis;
      setTimeout(() => {
        this.waiting = false;
        this.tryWait();
      }, remainingTime);
    }
  }
}
