<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
            <br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item" aria-label="reply" @click="increaseReplies">
              <span class="icon is-small">
                <i class="fas fa-reply" aria-hidden="true"></i>
              </span>
            </a>
            <span class="level-item">{{replies}}</span>
            <a class="level-item" aria-label="retweet" @click="increaseRetweets">
              <span class="icon is-small">
                <i class="fas fa-retweet" aria-hidden="true"></i>
              </span>
            </a>
            <span class="level-item">{{retweets}}</span>
            <a class="level-item" aria-label="like" @click="increaseLikes">
              <span class="icon is-small">
                <i class="fas fa-heart" aria-hidden="true"></i>
              </span>
            </a>
            <span class="level-item">{{likes}}</span>
          </div>
        </nav>
      </div>
      <button @click="undo">Undo</button>
    </article>
  </div>
</template>
<script>
import CountModel from './CountModel';
export default {
  data() {
    return CountModel;
  },
  methods: {
    increaseLikes() {
      this.$context.events.notify('count.like');
    },
    increaseRetweets() {
      this.$context.events.notify('count.retweets');
    },
    increaseReplies() {
      this.$context.events.notify('count.replies');
    },
    undo() {
      this.$context.history.pop().undo();
    }
  }
}
</script>