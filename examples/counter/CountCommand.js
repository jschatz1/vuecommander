import CountModel from './CountModel';

export class LikesCommand {
  execute() {
    CountModel.likes += 1;
  }
}

export class RetweetsCommand {
  execute() {
    CountModel.retweets += 1;
  }
}

export class RepliesCommand {
  execute() {
    CountModel.replies += 1;
  }
}