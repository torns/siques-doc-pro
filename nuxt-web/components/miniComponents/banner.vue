<template>
  <div>
    <slot></slot>
    <canvas id="canvas" class="canvas" style="margin-bottom: -10px;"> </canvas>
    <sq-wave></sq-wave>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import wave from './wave.vue'
@Component({
  components: {
    'sq-wave': wave
  }
})
export default class banner extends Vue {
  // Little Canvas things

  get canvas(): any {
    return document.querySelector('#canvas')
  }
  get window(): any {
    return window
  }

  get ctx() {
    return this.canvas == null ? '' : this.canvas.getContext('2d')
  }

  //   ctx: any
  // Configuration, Play with these
  config = {
    particleNumber: 400,
    maxParticleSize: 10,
    maxSpeed: 40,
    colorVariation: 50
  }
  // Colors
  colorPalette = {
    bg: { r: 12, g: 9, b: 29 },
    matter: [
      { r: 36, g: 18, b: 42 }, // darkPRPL
      { r: 78, g: 36, b: 42 }, // rockDust
      { r: 252, g: 178, b: 96 }, // solorFlare
      { r: 253, g: 238, b: 152 } // totesASun
    ]
  }
  // Some Variables hanging out
  particles: any = []
  get centerX() {
    return this.canvas.width / 2
  }

  get centerY() {
    return this.canvas.height / 2
  }

  // Draws the background for the canvas, because space
  drawBg(ctx: any, color: any) {
    ctx.fillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
  // Particle Constructor
  Particle(x: any, y: any, that: any) {
    // X Coordinate

    const thiss: any = this
    thiss.x = x || Math.round(Math.random() * that.canvas.width)
    // Y Coordinate
    thiss.y = y || Math.round(Math.random() * that.canvas.height)
    // Radius of the space dust
    thiss.r = Math.ceil(Math.random() * that.config.maxParticleSize)
    // Color of the rock, given some randomness
    thiss.c = that.colorVariation(that.colorPalette.matter[Math.floor(Math.random() * that.colorPalette.matter.length)], true)
    // Speed of which the rock travels
    thiss.s = Math.ceil(Math.random() * that.config.maxSpeed) ^ 0.7
    // Direction the Rock flies
    thiss.d = Math.round(Math.random() * 360)
  }
  // Provides some nice color variation
  // Accepts an rgba object
  // returns a modified rgba object or a rgba string if true is passed in for argument 2
  colorVariation(color: any, returnString: any) {
    const r = Math.round(Math.random() * this.config.colorVariation - this.config.colorVariation / 2 + color.r)
    const g = Math.round(Math.random() * this.config.colorVariation - this.config.colorVariation / 2 + color.g)
    const b = Math.round(Math.random() * this.config.colorVariation - this.config.colorVariation / 2 + color.b)
    const a = Math.random() + 0.5
    if (returnString) {
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
    } else {
      return { r, g, b, a }
    }
  }
  // Used to find the rocks next point in space, accounting for speed and direction
  updateParticleModel(p: any) {
    const a = 180 - (p.d + 90) // find the 3rd angle
    p.d > 0 && p.d < 180 ? (p.x += (p.s * Math.sin(p.d)) / Math.sin(p.s)) : (p.x -= (p.s * Math.sin(p.d)) / Math.sin(p.s))
    p.d > 90 && p.d < 270 ? (p.y += (p.s * Math.sin(a)) / Math.sin(p.s)) : (p.y -= (p.s * Math.sin(a)) / Math.sin(p.s))
    return p
  }
  // Just the function that physically draws the particles
  // Physically? sure why not, physically.
  drawParticle(x: any, y: any, r: any, c: any) {
    this.ctx.beginPath()
    this.ctx.fillStyle = c
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false)
    this.ctx.fill()
    this.ctx.closePath()
  }
  // Remove particles that aren't on the canvas
  cleanUpArray() {
    this.particles = this.particles.filter((p: any) => {
      return p.x > -100 && p.y > -100 && p.x < 1200 && p.y < 1200
    })
  }
  initParticles(numParticles: any, x: any, y: any) {
    const that = this
    for (let i = 0; i < numParticles; i++) {
      this.particles.push(new this.Particle(x, y, that))
    }
    this.particles.forEach((p: any) => {
      this.drawParticle(p.x, p.y, p.r, p.c)
    })
  }
  // Our Frame function
  frame() {
    if (this.canvas != null) {
      // Draw background first
      this.drawBg(this.ctx, this.colorPalette.bg)
      // Update Particle models to new position
      this.particles.map((p: any) => {
        return this.updateParticleModel(p)
      })
      // Draw em'
      this.particles.forEach((p: any) => {
        this.drawParticle(p.x, p.y, p.r, p.c)
      })
      // Play the same song? Ok!
      const window: any = this.window
      window.requestAnimFrame(this.frame)
    }
  }
  random: any = null

  randomClick() {
    this.random = setInterval(() => {
      this.cleanUpArray()
      this.initParticles(this.config.particleNumber, 0, 0)
    }, 13000)
  }
  //   Click listener
  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  init() {
    window.onresize = this.resizeCanvas
    // Set Canvas to be window size
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    // That thing
    this.window.requestAnimFrame = ((): any => {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        this.window.mozRequestAnimationFrame ||
        function(callback: any) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    })()
    document.body.addEventListener('click', this.clickEvent, false)
    // 监听用户离开页面
    document.addEventListener('visibilitychange', () => {
      // 页面变为不可见时触发
      if (document.visibilityState === 'hidden') {
        clearInterval(this.random)
      }
      // 页面变为可见时触发
      if (document.visibilityState === 'visible') {
        this.randomClick()
      }
    })
  }

  clickEvent(event: any) {
    const x: any = event.clientX
    const y: any = event.clientY
    const e: any = document.getElementById('home')
    const scroll: any = e.scrollTop - 50

    this.cleanUpArray()
    if (x < this.canvas.width && y < this.canvas.height - scroll) {
      this.initParticles(this.config.particleNumber, x, y + scroll)
    }
  }
  //   First Frame
  mounted() {
    this.init()
    setTimeout(() => {
      this.frame()
      this.initParticles(this.config.particleNumber, 0, 0)
    }, 200)
    this.randomClick()
  }

  destroyed() {
    document.body.removeEventListener('click', this.clickEvent, false)
    clearInterval(this.random)
  }
  // First particle explosion
}
</script>

<style lang="scss" scoped></style>
