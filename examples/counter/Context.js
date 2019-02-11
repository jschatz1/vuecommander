import Vue from 'vue';
import VueGlue from 'vueglue';
import {
  LikesCommand,
  RetweetsCommand,
  RepliesCommand
} from './CountCommand';

Vue.use(VueGlue);

export default new VueGlue.Context({
  'count.like': LikesCommand,
  'count.retweets': RetweetsCommand,
  'count.replies': RepliesCommand,
});