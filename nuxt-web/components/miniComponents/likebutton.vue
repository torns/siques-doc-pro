<template>
  <button class="like-button">
    <div class="like-wrapper">
      <div class="ripple"></div>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          :class="$attrs.status == true ? 'fill' : 'fillwhite'"
          d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
        ></path>
      </svg>
      <div class="particles" style="--total-particles: 6">
        <div class="particle" style="--i: 1; --color: #7642F0"></div>
        <div class="particle" style="--i: 2; --color: #AFD27F"></div>
        <div class="particle" style="--i: 3; --color: #DE8F4F"></div>
        <div class="particle" style="--i: 4; --color: #D0516B"></div>
        <div class="particle" style="--i: 5; --color: #5686F2"></div>
        <div class="particle" style="--i: 6; --color: #D53EF3"></div>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class LikeButtton extends Vue {
  show = false
}
</script>

<style lang="scss" scoped>
*,
*:before,
*:after {
  position: relative;
  box-sizing: border-box;
}

.like-button {
  // font-size: 5vmin;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 50%;
  background: white;
  width: 42px;
  height: 42px;
  padding: 0;
  margin: 0;
  outline: none;
  z-index: 2;
  -webkit-transition: -webkit-transform var(--duration) var(--easing);
  transition: -webkit-transform var(--duration) var(--easing);
  transition: transform var(--duration) var(--easing);
  transition: transform var(--duration) var(--easing), -webkit-transform var(--duration) var(--easing);
  cursor: pointer;
}
.like-button:before {
  z-index: -1;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0.3em 0.6em rgba(0, 0, 0, 0.3);
  border-radius: inherit;
  -webkit-transition: inherit;
  transition: inherit;
}
.like-button:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: inherit;
  z-index: -1;
}
.like-button:active:before {
  -webkit-animation: depress-shadow var(--duration) var(--easing) both;
  animation: depress-shadow var(--duration) var(--easing) both;
}
.like-button:focus:after {
  -webkit-animation: depress var(--duration) var(--easing) both;
  animation: depress var(--duration) var(--easing) both;
}
@-webkit-keyframes depress {
  from,
  to {
    -webkit-transform: none;
    transform: none;
  }
  50% {
    -webkit-transform: translateY(5%) scale(0.9);
    transform: translateY(5%) scale(0.9);
  }
}
@keyframes depress {
  from,
  to {
    -webkit-transform: none;
    transform: none;
  }
  50% {
    -webkit-transform: translateY(5%) scale(0.9);
    transform: translateY(5%) scale(0.9);
  }
}
@-webkit-keyframes depress-shadow {
  from,
  to {
    -webkit-transform: none;
    transform: none;
  }
  50% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
}
@keyframes depress-shadow {
  from,
  to {
    -webkit-transform: none;
    transform: none;
  }
  50% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
}
.like-wrapper {
  display: grid;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 1;
}
.like-wrapper > * {
  margin: auto;
  grid-area: 1 / 1;
}

.heart {
  width: 0.5em;
  height: 0.5em;
  display: block;
  -webkit-transform-origin: center 80%;
  transform-origin: center 80%;
}

.fill {
  fill: var(--color-heart);
}
.fillwhite {
  fill: transparent;
  stroke: var(--color-heart);
  stroke-width: 2;
  -webkit-transition: fill var(--duration) var(--easing);
  transition: fill var(--duration) var(--easing);
}

.like-button:focus .heart {
  -webkit-animation: heart-bounce var(--duration) var(--easing);
  animation: heart-bounce var(--duration) var(--easing);
}
@-webkit-keyframes heart-bounce {
  40% {
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }
  0%,
  80%,
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes heart-bounce {
  40% {
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }
  0%,
  80%,
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
/* Added wrapper to prevent layout jank with resizing particles */
.particles {
  width: 1px;
  height: 1px;
}

.particle {
  font-size: 5vmin;
  position: absolute;
  top: 0;
  left: 0;
  height: 0.1em;
  width: 0.1em;
  border-radius: 0.05em;
  background-color: var(--color);
  --percentage: calc(var(--i) / var(--total-particles));
  --Θ: calc(var(--percentage) * 1turn);
  -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0) scaleY(0);
  transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0) scaleY(0);
  -webkit-transition: all var(--duration) var(--easing);
  transition: all var(--duration) var(--easing);
}
.like-button:focus .particle {
  -webkit-animation: particles-out calc(var(--duration) * 1.2) var(--easing) forwards;
  animation: particles-out calc(var(--duration) * 1.2) var(--easing) forwards;
}
@-webkit-keyframes particles-out {
  50% {
    height: 0.3em;
  }
  50%,
  60% {
    height: 0.3em;
    -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
  }
  60% {
    height: 0.2em;
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
  }
}
@keyframes particles-out {
  50% {
    height: 0.3em;
  }
  50%,
  60% {
    height: 0.3em;
    -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(0.8em) scale(1);
  }
  60% {
    height: 0.2em;
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
    transform: translate(-50%, -50%) rotate(var(--Θ)) translateY(1em) scale(0);
  }
}
.ripple {
  height: 1em;
  width: 1em;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
}
.ripple:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0.4em solid var(--color-heart);
  border-radius: inherit;
  -webkit-transform: scale(0);
  transform: scale(0);
}
.like-button:focus .ripple:before {
  -webkit-animation: ripple-out var(--duration) var(--easing);
  animation: ripple-out var(--duration) var(--easing);
}
@-webkit-keyframes ripple-out {
  from {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  to {
    -webkit-transform: scale(5);
    transform: scale(5);
  }
}
@keyframes ripple-out {
  from {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  to {
    -webkit-transform: scale(5);
    transform: scale(5);
  }
}

/* Reset the animation when clicking again! */
.like-button:focus {
  pointer-events: none;
  cursor: normal;
}
</style>
