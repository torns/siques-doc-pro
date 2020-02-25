<template>
  <div>
    <div class="card-container">
      <router-link
        class="card point"
        tag="a"
        v-for="(note, index) in hotNotebooks"
        :to="`blogs/${note.id}`"
        :key="index"
        :style="
          `--image: url('http://www.jq22.com/demo/jqueryCorner201709040902/images/01.png'); --angle: -5deg; --x: 5%; --y: 15%; --caption: '${note.name}`
        "
      ></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class noteWall extends Vue {
  hotNotebooks = this.$attrs.hotNotebooks
}
</script>

<style lang="scss" scoped>
.heading {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 2vmin 3vmin;
  color: #999;
}

.card-container {
  position: relative;
  width: 277px;
  height: 280px;
}

.card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  border-radius: 2px;
  box-shadow: 2px 2px 5px rgba(17, 17, 17, 0.35);
  -webkit-transition: -webkit-transform 0.35s ease-out;
  transition: -webkit-transform 0.35s ease-out;
  transition: transform 0.35s ease-out;
  transition: transform 0.35s ease-out, -webkit-transform 0.35s ease-out;
  -webkit-transform: translate(var(--x), var(--y)) scale(0.35)
    rotate(var(--angle));
  transform: translate(var(--x), var(--y)) scale(0.35) rotate(var(--angle));
  will-change: transform;
}
.card:hover {
  -webkit-transform: scale(1) rotate(0deg);
  transform: scale(1) rotate(0deg);
  z-index: 1;
}
.card:hover:before {
  opacity: 1;
}

.card:before {
  content: '';
  display: block;
  width: 90%;
  height: 80%;
  margin: 5%;
  background: var(--image) center center no-repeat;
  background-size: cover;
  box-shadow: inset 0 0 5px rgba(34, 34, 34, 0.35);
  border-radius: 2px;
  -webkit-filter: sepia(0.2) brightness(0.9) contrast(1.2);
  filter: sepia(0.2) brightness(0.9) contrast(1.2);
  -webkit-transition: opacity 0.35s ease-out;
  transition: opacity 0.35s ease-out;
  opacity: 0.8;
  will-change: opacity;
}

.card:after {
  display: block;
  content: var(--caption);
  font-weight: 500;
  color: #555;
  font-size: 3vmin;
  opacity: 1;
  text-align: center;
}
</style>
