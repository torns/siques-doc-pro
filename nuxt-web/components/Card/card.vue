<template>
  <section class="xs hero-section">
    <div class="card-grid">
      <a
        :href="`/blogs/${collection.id}`"
        v-for="(collection, index) in collections"
        :key="index"
        class="card"
      >
        <div
          :style="
            `background-image: url(${
              collection.cover ? collection.cover : imgLink[index].link
            })`
          "
          class="card__background"
        ></div>
        <div class="card__content">
          <p class="card__category">专栏</p>
          <h3 class="card__heading">{{ collection.name }}</h3>
        </div>
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
    { link: 'https://picsum.photos/id/200/282/423' },
    { link: 'https://picsum.photos/id/201/282/423' },
    { link: 'https://picsum.photos/id/202/282/423' },
    { link: 'https://picsum.photos/id/203/282/423' }
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
  background-size: cover;
  background-position: center;
  border-radius: var(--spacing-l);
  bottom: 0;
  filter: brightness(0.75) saturate(1.2) contrast(0.85);
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform-origin: center;
  trsnsform: scale(1) translateZ(0);
  transition: filter 200ms linear, transform 200ms linear;
}

.card:hover .card__background {
  transform: scale(1.05) translateZ(0);
}

.card-grid:hover > .card:not(:hover) .card__background {
  filter: brightness(0.5) saturate(0) contrast(1.2) blur(20px);
}

.card__content {
  left: 0;
  padding: var(--spacing-l);
  position: absolute;
  top: 0;
}

.card__category {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-s);
  text-transform: uppercase;
}

.card__heading {
  color: var(--text-lighter);
  font-size: 1.9rem;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
  line-height: 1.4;
  word-spacing: 100vw;
}
</style>
