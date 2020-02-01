<template>
  <div class="stage">
    <div class="heart"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class LikeButtton extends Vue {
  show = false
}
</script>

<style lang="scss">
.heart {
  width: 100px;
  height: 100px;
  background: url('https://cssanimation.rocks/images/posts/steps/heart.png')
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
  -webkit-transition: background-position 1s steps(28);
  transition: background-position 1s steps(28);
  -webkit-transition-duration: 0s;
  transition-duration: 0s;
}
.heart.is-active {
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
  background-position: -2800px 0;
}

.stage {
  //   position: fixed;
  //   top: 50%;
  //   left: 50%;
  //   -webkit-transform: translate(-50%, -50%);
  //   transform: translate(-50%, -50%);
}
</style>
