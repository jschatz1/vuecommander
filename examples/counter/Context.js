import Vue from 'vue';
import Vueglue from '../../dist/vueglue.common.js';
import {
  LikesCommand,
  RetweetsCommand,
  RepliesCommand
} from './CountCommand';

Vue.use(Vueglue);

export default new Vueglue.Context({
  'count.like': LikesCommand,
  'count.retweets': RetweetsCommand,
  'count.replies': RepliesCommand,
});