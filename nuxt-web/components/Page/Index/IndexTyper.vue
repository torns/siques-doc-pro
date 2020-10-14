<template>
  <div class="typeContainer">
    <p>Coding is <span class="typed-text"></span><span class="cursor"> </span></p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class IndexTyper extends Vue {
  get typedTextSpan(): any {
    return document.querySelector('.typed-text')
  }

  get cursorSpan(): any {
    return document.querySelector('.cursor')
  }

  textArray: any = ['hard', 'fun', 'a journey', 'LIFE']
  typingSpeed: any = 200
  erasingSpeed: any = 100
  newTextDelay: any = 2000 // Delay between current and next text
  textArrayIndex: any = 0 // textArray index
  charIndex: any = 0 // character index

  type() {
    if (this.charIndex < this.textArray[this.textArrayIndex].length) {
      if (!this.cursorSpan.classList.contains('typing')) this.cursorSpan.classList.add('typing')
      this.typedTextSpan.textContent += this.textArray[this.textArrayIndex].charAt(this.charIndex)
      this.charIndex++
      setTimeout(this.type, this.typingSpeed)
    } else {
      this.cursorSpan.classList.remove('typing')
      setTimeout(this.erase, this.newTextDelay)
    }
  }

  erase() {
    if (this.charIndex > 0) {
      if (!this.cursorSpan.classList.contains('typing')) this.cursorSpan.classList.add('typing')
      this.typedTextSpan.textContent = this.textArray[this.textArrayIndex].substring(0, this.charIndex - 1)
      this.charIndex--
      setTimeout(this.erase, this.erasingSpeed)
    } else {
      this.cursorSpan.classList.remove('typing')
      this.textArrayIndex++
      if (this.textArrayIndex >= this.textArray.length) this.textArrayIndex = 0
      setTimeout(this.type, this.typingSpeed + 1100)
    }
  }

  init() {
    document.removeEventListener('pointerover', this.active, true)
    document.addEventListener('pointerover', this.active, { once: true })
  }

  active() {
    // On DOM Load initiate the effect
    // console.log(123)
    setTimeout(this.type, this.newTextDelay + 250)
  }

  destroyed() {
    document.removeEventListener('pointerover', this.active, true)
  }
  beforeMount() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.typeContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.typeContainer p {
  font-size: 3rem;
  padding: 0.5rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  text-align: center;
  overflow: hidden;
}
.typeContainer p span.typed-text {
  font-weight: normal;
  color: #dd7732;
}
.typeContainer p span.cursor {
  display: inline-block;
  background-color: #009a61;
  margin-left: 0.1rem;
  width: 3px;
  height: 35px;
  animation: blink 1s infinite;
}
.typeContainer p span.cursor.typing {
  animation: none;
}
@keyframes blink {
  0% {
    background-color: #009a61;
  }
  49% {
    background-color: #009a61;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
  100% {
    background-color: #009a61;
  }
}
</style>
