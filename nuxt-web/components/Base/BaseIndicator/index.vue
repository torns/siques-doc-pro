<template>
  <!-- <div class="popContainer">
    <div class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
  </div> -->
  <div class="popContainer">
    <!-- Loader -->
    <div class="blobs">
      <div class="blob-center"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  </div>

  <!-- http://tobiasahlin.com/spinkit -->
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class Indicator extends Vue {}
</script>

<style lang="scss" scoped>
.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  // background: #27ae60;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 50px;
  height: 50px;
  position: absolute;
}

.cube1,
.cube2 {
  background-color: #fff;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}

/*  */

svg {
  display: none;
}

.blobs {
  -webkit-filter: url(#goo);
  filter: url(#goo);
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 70px;
}
.blobs .blob-center {
  position: absolute;
  background: #fff200;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  -webkit-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: scale(0.9) translate(-50%, -50%);
  transform: scale(0.9) translate(-50%, -50%);
  -webkit-animation: blob-grow linear 3.4s infinite;
  animation: blob-grow linear 3.4s infinite;
  border-radius: 50%;
  box-shadow: 0 -10px 40px -5px #fff200;
}

.blob {
  position: absolute;
  background: #fff200;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  -webkit-animation: blobs ease-out 3.4s infinite;
  animation: blobs ease-out 3.4s infinite;
  -webkit-transform: scale(0.9) translate(-50%, -50%);
  transform: scale(0.9) translate(-50%, -50%);
  -webkit-transform-origin: center top;
  transform-origin: center top;
  opacity: 0;
}
.blob:nth-child(1) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.blob:nth-child(2) {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.blob:nth-child(3) {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.blob:nth-child(4) {
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.blob:nth-child(5) {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}

@-webkit-keyframes blobs {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translate(calc(-330px - 50%), -50%);
    transform: scale(0) translate(calc(-330px - 50%), -50%);
  }
  1% {
    opacity: 1;
  }
  35%,
  65% {
    opacity: 1;
    -webkit-transform: scale(0.9) translate(-50%, -50%);
    transform: scale(0.9) translate(-50%, -50%);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(0) translate(calc(330px - 50%), -50%);
    transform: scale(0) translate(calc(330px - 50%), -50%);
  }
}

@keyframes blobs {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translate(calc(-330px - 50%), -50%);
    transform: scale(0) translate(calc(-330px - 50%), -50%);
  }
  1% {
    opacity: 1;
  }
  35%,
  65% {
    opacity: 1;
    -webkit-transform: scale(0.9) translate(-50%, -50%);
    transform: scale(0.9) translate(-50%, -50%);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(0) translate(calc(330px - 50%), -50%);
    transform: scale(0) translate(calc(330px - 50%), -50%);
  }
}
@-webkit-keyframes blob-grow {
  0%,
  39% {
    -webkit-transform: scale(0) translate(-50%, -50%);
    transform: scale(0) translate(-50%, -50%);
  }
  40%,
  42% {
    -webkit-transform: scale(1, 0.9) translate(-50%, -50%);
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  43%,
  44% {
    -webkit-transform: scale(1.2, 1.1) translate(-50%, -50%);
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  45%,
  46% {
    -webkit-transform: scale(1.3, 1.2) translate(-50%, -50%);
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  47%,
  48% {
    -webkit-transform: scale(1.4, 1.3) translate(-50%, -50%);
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  52% {
    -webkit-transform: scale(1.5, 1.4) translate(-50%, -50%);
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  54% {
    -webkit-transform: scale(1.7, 1.6) translate(-50%, -50%);
    transform: scale(1.7, 1.6) translate(-50%, -50%);
  }
  58% {
    -webkit-transform: scale(1.8, 1.7) translate(-50%, -50%);
    transform: scale(1.8, 1.7) translate(-50%, -50%);
  }
  68%,
  70% {
    -webkit-transform: scale(1.7, 1.5) translate(-50%, -50%);
    transform: scale(1.7, 1.5) translate(-50%, -50%);
  }
  78% {
    -webkit-transform: scale(1.6, 1.4) translate(-50%, -50%);
    transform: scale(1.6, 1.4) translate(-50%, -50%);
  }
  80%,
  81% {
    -webkit-transform: scale(1.5, 1.4) translate(-50%, -50%);
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  82%,
  83% {
    -webkit-transform: scale(1.4, 1.3) translate(-50%, -50%);
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  84%,
  85% {
    -webkit-transform: scale(1.3, 1.2) translate(-50%, -50%);
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  86%,
  87% {
    -webkit-transform: scale(1.2, 1.1) translate(-50%, -50%);
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  90%,
  91% {
    -webkit-transform: scale(1, 0.9) translate(-50%, -50%);
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  92%,
  100% {
    -webkit-transform: scale(0) translate(-50%, -50%);
    transform: scale(0) translate(-50%, -50%);
  }
}
@keyframes blob-grow {
  0%,
  39% {
    -webkit-transform: scale(0) translate(-50%, -50%);
    transform: scale(0) translate(-50%, -50%);
  }
  40%,
  42% {
    -webkit-transform: scale(1, 0.9) translate(-50%, -50%);
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  43%,
  44% {
    -webkit-transform: scale(1.2, 1.1) translate(-50%, -50%);
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  45%,
  46% {
    -webkit-transform: scale(1.3, 1.2) translate(-50%, -50%);
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  47%,
  48% {
    -webkit-transform: scale(1.4, 1.3) translate(-50%, -50%);
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  52% {
    -webkit-transform: scale(1.5, 1.4) translate(-50%, -50%);
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  54% {
    -webkit-transform: scale(1.7, 1.6) translate(-50%, -50%);
    transform: scale(1.7, 1.6) translate(-50%, -50%);
  }
  58% {
    -webkit-transform: scale(1.8, 1.7) translate(-50%, -50%);
    transform: scale(1.8, 1.7) translate(-50%, -50%);
  }
  68%,
  70% {
    -webkit-transform: scale(1.7, 1.5) translate(-50%, -50%);
    transform: scale(1.7, 1.5) translate(-50%, -50%);
  }
  78% {
    -webkit-transform: scale(1.6, 1.4) translate(-50%, -50%);
    transform: scale(1.6, 1.4) translate(-50%, -50%);
  }
  80%,
  81% {
    -webkit-transform: scale(1.5, 1.4) translate(-50%, -50%);
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  82%,
  83% {
    -webkit-transform: scale(1.4, 1.3) translate(-50%, -50%);
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  84%,
  85% {
    -webkit-transform: scale(1.3, 1.2) translate(-50%, -50%);
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  86%,
  87% {
    -webkit-transform: scale(1.2, 1.1) translate(-50%, -50%);
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  90%,
  91% {
    -webkit-transform: scale(1, 0.9) translate(-50%, -50%);
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  92%,
  100% {
    -webkit-transform: scale(0) translate(-50%, -50%);
    transform: scale(0) translate(-50%, -50%);
  }
}
</style>
