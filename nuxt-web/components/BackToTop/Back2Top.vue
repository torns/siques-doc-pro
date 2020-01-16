<template>
  <button id="backbt" @click="btnTop" class="backtop">
    <font-awesome-icon :icon="['fas', 'angle-double-up']" class="text-gray" />
  </button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Back2Top extends Vue {
  btnTop() {
    console.log(123)
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.backtop {
  position: fixed;
  width: 42px;
  height: 42px;
  bottom: 29px;
  right: 5%;
  font-size: 18px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: transparent;
  z-index: 10;
  @media (max-width: 36em) {
    display: none;
  }
  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}
</style>
