import Vue from 'vue';
import Vuec from '../../dist/vuec.common.js';
import {
  LikesCommand,
  RetweetsCommand,
  RepliesCommand
} from './CountCommand';

Vue.use(Vuec);

export default new Vuec.Context({
  'count.like': LikesCommand,
  'count.retweets': RetweetsCommand,
  'count.replies': RepliesCommand,
});