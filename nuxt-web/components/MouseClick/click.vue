<template>
  <section
    id="wrap"
    v-show="layerx !== 0 && clickEvent"
    :class="`absolute  ${active ? 'active' : ''}`"
    :style="{
      '--l': layerx + 'px',
      '--t': layery + 'px'
    }"
  >
    <i
      v-for="(i, index) in 20"
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
import click from './click'
@Component({})
export default class MouseClick extends Vue {
  clickEvent = false
  active = false
  layerx = 0
  layery = 0
  timer: any

  confettiColors = ['#7d32f5', '#f6e434', '#63fdf1', '#e672da', '#295dfe', '#6e57ff']

  get cube(): HTMLElement {
    return document.getElementById('wrap')
  }

  mounted() {
    // this.initState()
    // console.log(this.down())

    setTimeout(() => {
      click()
    }, 1000)
  }
  off = 0

  down() {
    let _top = 0
    // 起始位
    let t = 0.0
    // 时间bai
    let h
    // 高度
    let offbottom = 1000
    const off = setInterval(() => {
      t += 0.01
      h = 5 * t * t
      //  满足公式h=1/2gt^2,此处g取10
      offbottom -= h
      if (offbottom < 0) {
        clearInterval(off)
      }
      _top += h
      for (let index = 0; index < this.cube.children.length; index++) {
        const e: any = this.cube.children[index]
        e.style.top = _top + 'px'
      }
      this.off = _top
    }, 10)
  }

  initState() {
    const el: any = document.getElementById('article')
    el.addEventListener('click', (e: any) => {
      if (!this.clickEvent) {
        this.down()
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
    }, 5000)
  }

  random(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  x() {
    return this.random(-260, 260)
  }
  y() {
    return this.random(-20, 1080)
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
  // opacity: var(--o, 0);
  background: var(--b);
  // border-radius: 4px;
  -webkit-transform: translate(var(--x), 0);
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
