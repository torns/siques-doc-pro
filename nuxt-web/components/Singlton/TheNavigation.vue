<template>
  <div v-if="!isHomepage" id="navigation" class="visible-sm visible-xs animated fadeIn" style="position: fixed;z-index: 10;bottom: -2px;width:101vw">
    <nav class="tabbar">
      <div>
        <input id="menu-1" type="radio" name="menu" checked />
        <label @click="$router.push('/')" for="menu-1">
          <svg>
            <use xlink:href="#messageIcon" />
          </svg>
          <span>首页</span>
        </label>
        <input id="menu-2" type="radio" name="menu" :checked="$route.path == '/collection'" />
        <label @click="$router.push('/collection')" for="menu-2">
          <svg>
            <use xlink:href="#imageIcon" />
          </svg>
          <span>专栏</span>
        </label>
        <input id="menu-3" type="radio" name="menu" :checked="$route.path == '/n'" />
        <label @click="$router.push('/n')" for="menu-3">
          <svg>
            <use xlink:href="#settingsIcon" />
          </svg>
          <span>笔记</span>
        </label>
        <span></span>
      </div>
    </nav>

    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="messageIcon" fill="currentColor">
        <path
          d="M19.07 4.93a10 10 0 0 0-16.28 11 1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zM8 13a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
        />
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="imageIcon" fill="currentColor">
        <path
          d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM8 7a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 8 7zm11 10.83A1.09 1.09 0 0 1 18 19H6l7.57-6.82a.69.69 0 0 1 .93 0l4.5 4.48z"
        />
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="settingsIcon" fill="currentColor">
        <circle cx="12" cy="12" r="1.5" />
        <path
          d="M21.89 10.32L21.1 7.8a2.26 2.26 0 0 0-2.88-1.51l-.34.11a1.74 1.74 0 0 1-1.59-.26l-.11-.08a1.76 1.76 0 0 1-.69-1.43v-.28a2.37 2.37 0 0 0-.68-1.68 2.26 2.26 0 0 0-1.6-.67h-2.55a2.32 2.32 0 0 0-2.29 2.33v.24a1.94 1.94 0 0 1-.73 1.51l-.13.1a1.93 1.93 0 0 1-1.78.29 2.14 2.14 0 0 0-1.68.12 2.18 2.18 0 0 0-1.12 1.33l-.82 2.6a2.34 2.34 0 0 0 1.48 2.94h.16a1.83 1.83 0 0 1 1.12 1.22l.06.16a2.06 2.06 0 0 1-.23 1.86 2.37 2.37 0 0 0 .49 3.3l2.07 1.57a2.25 2.25 0 0 0 1.35.43A2 2 0 0 0 9 22a2.25 2.25 0 0 0 1.47-1l.23-.33a1.8 1.8 0 0 1 1.43-.77 1.75 1.75 0 0 1 1.5.78l.12.17a2.24 2.24 0 0 0 3.22.53L19 19.86a2.38 2.38 0 0 0 .5-3.23l-.26-.38A2 2 0 0 1 19 14.6a1.89 1.89 0 0 1 1.21-1.28l.2-.07a2.36 2.36 0 0 0 1.48-2.93zM12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z"
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
  --circle: #e4ecfa;
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
