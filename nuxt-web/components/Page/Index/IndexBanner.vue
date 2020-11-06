<template>
  <div>
    <div>
      <slot></slot>
    </div>
    <canvas id="canvas" class="canvas" style="margin-bottom: -10px; background-color: #000; "> </canvas>
    <sq-wave></sq-wave>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import canav from './Canva/cool'
import wave from '~/components/Base/BaseWave/index.vue'

@Component({
  components: {
    'sq-wave': wave
  }
})
export default class IndexBanner extends Vue {
  // Little Canvas things

  get canvas(): any {
    return document.querySelector('#canvas')
  }
  get window(): any {
    return window
  }
  timer = null
  mounted() {
    this.timer = canav(this.window)
  }

  destroyed() {
    cancelAnimationFrame(this.timer)
    this.window.requestAnimFrame = null
  }
}
</script>

<style lang="scss" scoped>
.breath {
  animation: breath 10000ms ease-in-out infinite alternate;
}
@keyframes breath {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
