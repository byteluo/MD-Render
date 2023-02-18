import os from "os";

export class Scheduler {
  private tasks: Array<() => Promise<any>> = [];
  private running = false;
  private concurrency: number;
  private pendingTasks: Promise<any>[] = [];

  constructor(concurrency = os.cpus().length) {
    this.concurrency = concurrency;
  }

  public addAsyncTask(asyncTask: () => Promise<any>): void {
    this.tasks.push(asyncTask);

    if (!this.running) {
      this.running = true;
      this.runTasks();
    }
  }

  private async runTasks(): Promise<void> {
    while (
      this.tasks.length > 0 &&
      this.pendingTasks.length < this.concurrency
    ) {
      const task = this.tasks.shift();
      const promise = task!();

      this.pendingTasks.push(promise);
      promise.then(() => {
        this.pendingTasks = this.pendingTasks.filter((p) => p !== promise);
      });
    }

    if (this.tasks.length === 0 && this.pendingTasks.length === 0) {
      this.running = false;
    } else {
      await Promise.race(this.pendingTasks);
      await this.runTasks();
    }
  }

  public async waitForAllTasks(): Promise<any[]> {
    while (this.tasks.length > 0) {
      const task = this.tasks.shift();
      const promise = task!();
      this.pendingTasks.push(promise);
      promise.then((result) => {
        this.pendingTasks = this.pendingTasks.filter((p) => p !== promise);
        return result;
      });
    }

    while (this.pendingTasks.length > 0) {
      await Promise.race(this.pendingTasks);
    }

    return await Promise.all(this.pendingTasks);
  }
}
