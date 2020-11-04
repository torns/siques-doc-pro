<template>
  <div class="note_body">
    <div
      :style="{
        '--url': `url(${url})`
      }"
      class="book d-flex jc-center"
    >
      <div class="title1 ellipsis-1 px-2">
        {{ $attrs.title ? $attrs.title : '' }}
      </div>
      <div class="title ellipsis-1 px-2">
        {{ $attrs.title ? $attrs.title : '' }}
      </div>
      <img :src="$attrs.cover ? $attrs.cover : url" alt="the cast of Schitt’s Creek" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class BookFace extends Vue {
  @Prop()
  index: any

  get url() {
    return this.coverLink[this.index % this.coverLink.length].url
  }

  coverLink = [
    { url: 'https://cdn.siques.cn/public/book_cover/1.jpg' },
    { url: 'https://cdn.siques.cn/public/book_cover/2.jpg' },
    { url: 'https://cdn.siques.cn/public/book_cover/4.jpg' },
    { url: 'https://cdn.siques.cn/public/book_cover/5.jpg' },
    { url: 'https://cdn.siques.cn/public/book_cover/6373054467654143309998883.png' }
  ]
}
</script>

<style lang="scss">
.book {
  width: 14.8em;
  height: 18.5991em;
  margin: 0 auto !important;
  position: relative;
  -webkit-transform: perspective(60em) rotateX(58deg) rotateZ(-34deg) skewY(-7deg);
  transform: perspective(60em) rotateX(58deg) rotateZ(-34deg) skewY(-7deg);
  box-shadow: -1.4em 1.7em 0.3em -0.3em rgba(0, 0, 0, 0.8), -1.6em 1.8em 0.9em -0.2em rgba(0, 0, 0, 0.5),
    0.3em 1.9em 1.3em rgba(0, 0, 0, 0.3);
  border-top-right-radius: 0.4em;
}
.book img {
  border-top-right-radius: 0.4em;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  clip: rect(0em, 14.8em, 18.5991em, 0em);
  display: block;
  position: absolute;
  -webkit-filter: saturate(90%);
  filter: saturate(90%);
  object-fit: cover;
}
.book:before,
.book:after {
  content: '';
  position: absolute;
  top: 0;
}
.book:before {
  width: 105%;
  height: 105%;
  left: -5%;
  z-index: -1;
  background-repeat: no-repeat;
  background-image: linear-gradient(115deg, transparent 2.8%, #3f3f3f 3%, #3f3f3f 16%, transparent 16%),
    linear-gradient(125deg, transparent 10%, #3f3f3f 10%, #3f3f3f 17%, #222 46.8%, transparent 47%),
    linear-gradient(125deg, transparent 46%, rgba(0, 0, 0, 0.5) 46.5%, rgba(0, 0, 0, 0.25) 49%, transparent 53%),
    linear-gradient(to right, #444, #666), linear-gradient(#444, #444),
    linear-gradient(140deg, transparent 45%, #eee 45%, #ccc 96.8%, rgba(170, 170, 170, 0) 97%);
  background-size: 100% 100%, 100% 100%, 100% 100%, 100% 0.4em, 94% 0.2em, 100% 100%;
  background-position: 0 0, 0 0, 0 0, 0 95.8%, 0 100%, 0 0;
}
.book:after {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      to right,
      transparent 2%,
      rgba(0, 0, 0, 0.1) 3%,
      rgba(0, 0, 0, 0.1) 4%,
      transparent 5%
    ),
    linear-gradient(-50deg, rgba(0, 0, 0, 0.1) 20%, transparent 100%),
    linear-gradient(-50deg, rgba(0, 0, 0, 0.2) 20%, transparent 100%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 20%, transparent 100%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 20%, transparent 100%);
  background-size: 100% 100%, 2% 20%, 1% 20%, 2% 20%, 1% 20%;
  background-position: 0 0, 2.2% 100%, 3% 100%, 2.2% 0, 3% 0;
  background-color: #00000017;
}

// .book {
//   &:after {
//     content: '';
//     position: absolute;
//     height: 37px;
//     width: 100%;
//     background: #ffffff;
//     filter: blur(17px);
//     left: 0;
//     background-image: var(--url);
//     background-attachment: fixed;
//   }
// }

.book {
  .title {
    position: absolute;
    z-index: 20;
    color: white;
    font-weight: 700;
    font-size: 29px;
    text-align: center;
    margin: 0 auto;

    top: 10%;
  }
}

// .note_body > img {
//   width: 220px;
// }
</style>
