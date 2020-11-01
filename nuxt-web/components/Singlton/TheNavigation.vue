<template>
  <div v-if="!isHomepage" id="navigation" class="visible-sm visible-xs animated fadeIn" style="position: fixed;z-index: 10;bottom: -2px;width:101vw">
    <nav class="tabbar">
      <div>
        <input id="menu-1" type="radio" name="menu" checked />
        <label @click="$router.push('/')" for="menu-1">
          <svg>
            <use xlink:href="#messageIcon" />
          </svg>
          <span></span>
        </label>
        <input />
        <label @click="$router.push('/')">
          <!-- <svg>
            <use xlink:href="#imageIcon" />
          </svg> -->
          <img style="height:30px" src="~/static/banner1.png" alt="banner" />
          <!-- <span>主页</span> -->
        </label>
        <input id="menu-3" type="radio" name="menu" />
        <label @click="$router.push('/search')" for="menu-3">
          <svg>
            <use xlink:href="#searchIcon" />
          </svg>
          <span></span>
        </label>
        <span></span>
      </div>
    </nav>

    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="messageIcon" fill="currentColor">
        <path d="M159.744 101.888h217.6c51.2 0 76.8 25.6 76.8 76.8v217.6c0 51.2-25.6 76.8-76.8 76.8H159.744c-51.2 0-76.8-25.6-76.8-76.8V178.688c0-51.2 25.6-76.8 76.8-76.8z" fill="#D1D1D1" />
        <path d="M750.592 71.68c136.704 0 204.8 68.096 204.8 204.8s-68.096 204.8-204.8 204.8-204.8-68.096-204.8-204.8c0-136.192 68.608-204.8 204.8-204.8z" fill="#997CD8" />
        <path d="M652.8 581.12H870.4c51.2 0 76.8 25.6 76.8 76.8V875.52c0 51.2-25.6 76.8-76.8 76.8h-217.6c-51.2 0-76.8-25.6-76.8-76.8v-217.6c0-51.2 25.6-76.8 76.8-76.8z" fill="#D1D1D1" />
        <path
          d="M311.296 607.232L471.04 874.496c12.8 20.992 5.632 48.64-15.36 61.44-7.168 4.096-14.848 6.144-23.04 6.144H113.152c-24.576 0-45.056-19.968-45.056-44.544 0-8.192 2.048-15.872 6.144-23.04l159.744-267.264c12.8-20.992 39.936-28.16 61.44-15.36 6.656 3.584 12.288 8.704 15.872 15.36z"
        />
      </symbol>

      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 -100 900 1200" id="searchIcon" fill="currentColor">
        <circle cx="12" cy="12" r="1.5" />
        <path
          d="M799.117225 727.668111A446.399272 446.399272 0 0 0 896.675651 448.449169a51.046313 51.046313 0 1 0-102.165758 0 346.134953 346.134953 0 1 1-39.345152-160.525295 51.046313 51.046313 0 1 0 90.464597-47.462832 448.300711 448.300711 0 1 0-118.035456 558.730412c1.316381 1.828306 2.92529 3.58348 4.534199 5.19239l204.624044 204.624044a51.046313 51.046313 0 0 0 72.181534-72.181534l-204.624044-204.624043a51.558238 51.558238 0 0 0-5.119258-4.5342z"
        />
      </symbol>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class TheNavigation extends Vue {
  get isHomepage() {
    return this.$route.path === '/'
  }

  get link() {
    return this.$route.path
  }

  btnClick(link: any) {
    if (link === 'top') {
      window.scrollTo(0, 0)
    } else {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="scss">
.tabbar {
  --icon-active: #1abc9c;
  --icon-inactive: #6c7486;
  --icon-hover: #99a3ba;
  --text: #000000;
  --circle: #ffffff;
  --background: #ffffff;
  --shadow: rgba(18, 22, 33, 0.1);
  // border-radius: 0 0 12px 12px;
  background: var(--background);
  width: 100%;
  height: 64px;
  padding: 0 12px;
  box-shadow: 0 8px 16px var(--shadow);
}
.tabbar > div {
  display: flex;
  height: 100%;
  position: relative;
}
.tabbar > div label {
  flex: 0 0 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 1;
}
.tabbar > div label svg,
.tabbar > div label span {
  display: block;
  -webkit-backface-visibility: hidden;
  transition: opacity 0.4s ease, color 0.4s ease, -webkit-transform 0.4s cubic-bezier(0.2, 0.64, 0.48, 1.12);
  transition: transform 0.4s cubic-bezier(0.2, 0.64, 0.48, 1.12), opacity 0.4s ease, color 0.4s ease;
  transition: transform 0.4s cubic-bezier(0.2, 0.64, 0.48, 1.12), opacity 0.4s ease, color 0.4s ease, -webkit-transform 0.4s cubic-bezier(0.2, 0.64, 0.48, 1.12);
  -webkit-transform: translateY(var(--y)) scale(var(--s));
  transform: translateY(var(--y)) scale(var(--s));
}
.tabbar > div label svg {
  --y: 0;
  --s: 0.84;
  width: 24px;
  height: 24px;
  margin: auto;
  color: var(--icon-inactive);
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}
.tabbar > div label span {
  --y: -8px;
  --s: 0.92;
  font-size: 10px;
  font-weight: 500;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  bottom: 0;
  opacity: 0;
  color: var(--text);
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
}
.tabbar > div label:hover svg {
  color: var(--icon-hover);
}
.tabbar > div label:active svg {
  --s: 0.76;
}
.tabbar > div input {
  display: none;
}
.tabbar > div input:nth-of-type(1):checked + label + input + label + input + label + span {
  --x: 0;
}
.tabbar > div input:nth-of-type(2):checked + label + input + label + span {
  --x: 100%;
}
.tabbar > div input:nth-of-type(3):checked + label + span {
  --x: 200%;
}
.tabbar > div input:checked + label svg {
  --y: -24px;
  --s: 1;
  color: var(--icon-active);
}
.tabbar > div input:checked + label span {
  --s: 1;
  --y: -14px;
  opacity: 1;
}
.tabbar > div > span {
  --x: 0;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 33.33%;
  transition: -webkit-transform 0.4s cubic-bezier(0.2, 0.64, 0.48, 1.12);
  transition: transform 0.4s cubic-bezier(0.2, 0.64, 0.48, 1.12);
  transition: transform 0.4s cubic-bezier(0.2, 0.64, 0.48, 1.12), -webkit-transform 0.4s cubic-bezier(0.2, 0.64, 0.48, 1.12);
  -webkit-transform: translateX(var(--x));
  transform: translateX(var(--x));
  -webkit-backface-visibility: hidden;
}
.tabbar > div > span:after {
  content: '';
  width: 44px;
  height: 44px;
  display: block;
  border-radius: 50%;
  background: var(--circle);
  position: absolute;
  left: 50%;
  top: 0;
  box-shadow: 0 2px 8px var(--shadow);
  margin: -14px 0 0 -22px;
}

.dribbble {
  position: fixed;
  display: block;
  right: 20px;
  bottom: 20px;
}
.dribbble img {
  display: block;
  height: 28px;
}
</style>
