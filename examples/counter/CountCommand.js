import CountModel from './CountModel';

export class LikesCommand {
  constructor() {
    this.backup;
  }

  execute() {
    CountModel.likes += 1;
  }

  saveState() {
    this.backup = CountModel.likes;
  }

  undo() {
    CountModel.likes = this.backup;
  }
}

export class RetweetsCommand {
  constructor() {
    this.backup;
  }

  execute() {
    CountModel.retweets += 1;
  }

  saveState() {
    this.backup = CountModel.retweets;
  }

  undo() {
    CountModel.retweets = this.backup;
  }
}

export class RepliesCommand {
  constructor() {
    this.backup;
  }

  execute() {
    CountModel.replies += 1;
  }

  saveState() {
    this.backup = CountModel.replies;
  }

  undo() {
    CountModel.replies = this.backup;
  }
}