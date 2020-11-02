<template>
  <div class="side-menu">
    <svg @click="active = !active" :class="`ham ham3 ${active == true ? 'active' : ''}`" viewBox="0 0 100 100" width="60">
      <path
        class="line top"
        d="m 70,33 h -40 c -11.092231,0 11.883874,13.496726 -3.420361,12.956839 -0.962502,-2.089471 -2.222071,-3.282996 -4.545687,-3.282996 -2.323616,0 -5.113897,2.622752 -5.113897,7.071068 0,4.448316 2.080609,7.007933 5.555839,7.007933 2.401943,0 2.96769,-1.283974 4.166879,-3.282995 2.209342,0.273823 4.031294,1.642466 5.857227,-0.252538 v -13.005715 16.288404 h 7.653568"
      />
      <path
        class="line middle"
        d="m 70,50 h -40 c -5.6862,0 -8.534259,5.373483 -8.534259,11.551069 0,7.187738 3.499166,10.922274 13.131984,10.922274 11.021777,0 7.022787,-15.773343 15.531095,-15.773343 3.268142,0 5.177031,-2.159429 5.177031,-6.7 0,-4.540571 -1.766442,-7.33533 -5.087851,-7.326157 -3.321409,0.0092 -5.771288,2.789632 -5.771288,7.326157 0,4.536525 2.478983,6.805271 5.771288,6.7"
      />
      <path
        class="line bottom"
        d="m 70,67 h -40 c 0,0 -3.680675,0.737051 -3.660714,-3.517857 0.02541,-5.415597 3.391687,-10.357143 10.982142,-10.357143 4.048418,0 17.88928,0.178572 23.482143,0.178572 0,2.563604 2.451177,3.403635 4.642857,3.392857 2.19168,-0.01078 4.373905,-1.369814 4.375,-3.392857 0.0011,-2.023043 -1.924401,-2.589191 -4.553571,-4.107143 -2.62917,-1.517952 -4.196429,-1.799562 -4.196429,-3.660714 0,-1.861153 2.442181,-3.118811 4.196429,-3.035715 1.754248,0.0831 4.375,0.890841 4.375,3.125 2.628634,0 6.160714,0.267857 6.160714,0.267857 l -0.178571,-2.946428 10.178571,0 -10.178571,0 v 6.696428 l 8.928571,0 -8.928571,0 v 7.142858 l 10.178571,0 -10.178571,0"
      />
    </svg>

    <nav style=" overflow-y:auto" :class="`menu ${active ? 'menu_active' : ''}`">
      <p @click="active = false" class="pb-2">close</p>
      <slot></slot>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class NaviSideMenu extends Vue {
  active = false
}
</script>

<style lang="scss" scoped>
.side-menu {
  position: fixed;
  left: 0;
  bottom: 10%;
  z-index: 5;
}

.side-menu nav {
  line-height: 1.4;
  // font-family: 'Space Mono', monospace;
  background: #1d1f20;
  padding: 25px 35px;
  width: 300px;
  top: calc(50vh - 247px);
  left: calc(50vw - 150px);
  position: fixed;
  border-radius: 16px;
  box-shadow: 0 0 60px -15px black;
  transform: scale(0) rotate(360deg);
  transition: all 0.75s;
  font-size: 18px;
  height: 494px;
}

.side-menu nav.menu_active {
  transform: scale(1) rotate(0deg);
}

.side-menu .main-app {
  position: fixed;

  font-size: 60px;
  color: #cfd8dc;
  top: calc(50vh - 40px);
  left: calc(50vw - 126px);
  cursor: pointer;
  transition: all 0.3s;
}

.side-menu p {
  float: right;
  cursor: pointer;
  font-size: 16px;
  color: #cfd8dc;
  transition: all 0.2s;
}

.side-menu p:hover {
  border-bottom: 2px dotted #cfd8dc;
  padding-bottom: 5px;
}

.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham3 .top {
  stroke-dasharray: 40 130;
}
.ham3 .middle {
  stroke-dasharray: 40 140;
}
.ham3 .bottom {
  stroke-dasharray: 40 205;
}
.ham3.active .top {
  stroke-dasharray: 75 130;
  stroke-dashoffset: -63px;
}
.ham3.active .middle {
  stroke-dashoffset: -102px;
}
.ham3.active .bottom {
  stroke-dasharray: 110 205;
  stroke-dashoffset: -86px;
}
</style>
