import os from "os";

export class Scheduler {
  private tasks: Array<Promise<any>> = [];

  public async addAsyncTask(asyncTask: () => Promise<any>) {
    this.tasks.push(asyncTask());
  }

  public async waitForAllTasks(): Promise<any[]> {
    return await Promise.all(this.tasks);
  }
}
