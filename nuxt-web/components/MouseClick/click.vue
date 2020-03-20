<template>
  <section
    v-show="layerx !== 0 && clickEvent"
    :class="`absolute  ${active ? 'active' : ''}`"
    :style="{
      '--l': layerx + 'px',
      '--t': layery + 'px'
    }"
  >
    <i
      v-for="(i, index) in 50"
      :style="{
        '--x': x() + 'px',
        '--y': y() + 'px',
        '--r': degree() + 'deg',
        '--s': opct(),
        '--b': color()
      }"
      :key="index"
    ></i>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class MouseClick extends Vue {
  clickEvent = false
  active = false
  layerx = 0
  layery = 0
  timer: any

  confettiColors = [
    '#7d32f5',
    '#f6e434',
    '#63fdf1',
    '#e672da',
    '#295dfe',
    '#6e57ff'
  ]

  mounted() {
    this.initState()
  }

  initState() {
    document.addEventListener('click', (e) => {
      if (!this.clickEvent) {
        this.clickEvent = true
        this.active = true
        this.layerx = e.pageX
        this.layery = e.pageY
        this.complete()
      }
    })
  }

  complete() {
    this.timer = setTimeout(() => {
      this.clickEvent = false
      this.active = false
    }, 800)
  }

  random(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  x() {
    return this.random(-260, 260)
  }
  y() {
    return this.random(-20, 160)
  }
  degree() {
    return this.random(0, 360)
  }
  opct() {
    return this.random(0.8, 1)
  }
  color() {
    return this.confettiColors[this.random(0, 5)]
  }
}
</script>

<style lang="scss" scoped>
i {
  --o: 1;
  position: absolute;
  display: block;
  width: 4px;
  height: 4px;
  top: 50%;
  left: 50%;
  margin: -2px 0 0 -2px;
  opacity: var(--o, 0);
  background: var(--b);
  -webkit-transform: translate(var(--x), var(--y)) scale(var(--s, 1));
  transform: translate(var(--x), var(--y)) scale(var(--s, 1));
  -webkit-animation: confetti 0.8s ease-out forwards;
  animation: confetti 0.8s ease-out forwards;
}

.active i {
  --o: 0;
}

section {
  left: var(--l);
  top: var(--t);
}

@-webkit-keyframes confetti {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes confetti {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
