export class Count {
  postCount = 0;
  wordCount = 0;
  imageCount = 0;
  totalTime = 0;
  lastModified = 0;

  static getInstance = (function () {
    let instance: Count;
    return function () {
      if (!instance) {
        instance = new Count();
      }
      return instance;
    };
  })();
  countWord(n: number) {
    this.wordCount += n;
  }
  countPost(n: number) {
    this.postCount += n;
  }
  updateLastModified(time: number) {
    if (time > this.lastModified) {
      this.lastModified = time;
    }
  }
}
