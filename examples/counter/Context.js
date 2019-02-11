import Vue from 'vue';
import VueCommander from 'vuecommander';
import {
  LikesCommand,
  RetweetsCommand,
  RepliesCommand
} from './CountCommand';

Vue.use(VueCommander);

export default new VueCommander.Context({
  'count.like': LikesCommand,
  'count.retweets': RetweetsCommand,
  'count.replies': RepliesCommand,
});