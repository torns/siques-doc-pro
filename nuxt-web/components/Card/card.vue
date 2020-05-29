<template>
  <section class="xm hero-section">
    <div class="card-grid">
      <a :href="`/blogs/${collection.id}`" v-for="(collection, index) in collections" :key="index" class="card">
        <div :style="`background-image: url(${collection.cover ? collection.cover : imgLink[index].link})`" class="card__background">
          <div class="bg-white card__content">
            <p class="card__category">专栏</p>
            <h3 class="card__heading">{{ collection.name }}</h3>
          </div>
        </div>
        <!-- <div class="card__content">
         
        </div> -->
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class Card extends Vue {
  collections = this.$attrs.data
  imgLink = [
    { link: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/4.jpg' },
    { link: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/6.jpg' },
    { link: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/7.jpg' },
    { link: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/8.jpg' }
  ]
}
</script>

<style lang="scss" scoped>
.hero-section {
  align-items: flex-start;
  //   background-image: linear-gradient(15deg, #0f4667 0%, #2a6973 150%);

  display: flex;
  min-height: 100%;
  justify-content: space-between;
  padding: 40px 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: var(--spacing-l);
  grid-row-gap: var(--spacing-l);
  max-width: var(--width-container);
  width: 100%;
}

@media (min-width: 540px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card {
  list-style: none;
  position: relative;
}

.card:before {
  content: '';
  display: block;
  padding-bottom: 110%;
  width: 100%;
}

.card__background {
  // background-size: cover;
  // background-size: auto 58%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: top;
  background-position: center;
  border-radius: 5px;
  bottom: 0;
  filter: brightness(1) saturate(1.2) contrast(1);
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform-origin: center;
  trsnsform: scale(1) translateZ(0);
  transition: filter 200ms linear, transform 200ms linear;
}

.card:hover .card__background {
  transform: scale(1.1) translateZ(0);
}

.card-grid:hover > .card:not(:hover) .card__background {
  filter: brightness(0.5) saturate(0) contrast(1.2) blur(20px);
}

.card__content {
  left: 0;
  // padding: var(--spacing-l);
  border-radius: 0 0 5px 5px;
  position: absolute;
  // top: 0;
  ////
  width: 100%;
  height: 80px;
  bottom: -2px;
  position: absolute;
}

.card__category {
  // color: var(--text-light);
  color: black;
  padding: 10px 10px 0 10px;
  font-size: 0.9rem;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.card__heading {
  color: black;
  padding: 4px 10px;
  font-size: 16px;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
  line-height: 1.4;
  word-spacing: 100vw;
}
</style>
