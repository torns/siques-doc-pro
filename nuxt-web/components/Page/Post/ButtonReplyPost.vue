<template>
  <div :class="`chat ${show ? 'active' : ''}`">
    <div class="background"></div>
    <svg class="chat-bubble" width="100" height="100" viewBox="0 0 100 100">
      <g class="bubble">
        <path
          class="line line1"
          d="M 30.7873,85.113394 30.7873,46.556405 C 30.7873,41.101961
          36.826342,35.342 40.898074,35.342 H 59.113981 C 63.73287,35.342
          69.29995,40.103201 69.29995,46.784744"
        />
        <path
          class="line line2"
          d="M 13.461999,65.039335 H 58.028684 C
            63.483128,65.039335
            69.243089,59.000293 69.243089,54.928561 V 45.605853 C
            69.243089,40.986964 65.02087,35.419884 58.339327,35.419884"
        />
      </g>
      <circle class="circle circle1" r="1.9" cy="50.7" cx="42.5" />
      <circle class="circle circle2" cx="49.9" cy="50.7" r="1.9" />
      <circle class="circle circle3" r="1.9" cy="50.7" cx="57.3" />
    </svg>
  </div>
</template>

<script lang="js">
import { Vue, Component,Prop } from 'vue-property-decorator'

@Component({})
export default class replybutton extends Vue {
  @Prop()
  show


}
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  position: relative;
}
.background {
  background-color: #1abc9c;
  border-radius: 50%;
  box-shadow: 0 2.1px 1.3px rgba(0, 0, 0, 0.044), 0 5.9px 4.2px rgba(0, 0, 0, 0.054),
    0 12.6px 9.5px rgba(0, 0, 0, 0.061), 0 25px 20px rgba(0, 0, 0, 0.1);
  height: 80px;
  left: 10px;
  position: absolute;
  top: 10px;
  width: 80px;
}
.chat-bubble {
  cursor: pointer;
  position: relative;
}
.bubble {
  transform-origin: 50%;
  transition: transform 500ms cubic-bezier(0.17, 0.61, 0.54, 0.9);
}
.line {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2.75;
  stroke-linecap: round;
  transition: stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 {
  stroke-dasharray: 60 90;
  stroke-dashoffset: -20;
}
.line2 {
  stroke-dasharray: 67 87;
  stroke-dashoffset: -18;
}
.circle {
  fill: #ffffff;
  stroke: none;
  transform-origin: 50%;
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
.active .bubble {
  transform: translateX(24px) translateY(4px) rotate(45deg);
}
.active .line1 {
  stroke-dashoffset: 21;
}
.active .line2 {
  stroke-dashoffset: 30;
}
.active .circle {
  transform: scale(0);
}
</style>
