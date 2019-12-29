<template>
  <ul>
    <li class="search__box">
      <input class="search__txt" type="text" v-model="query" placeholder="Type to search" />
      <a class="search__btn">
        <i class="el-icon-search" style="font-size:8px"></i>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class SearchButton extends Vue {
  query = "";
}
</script>

<style lang="scss" scoped>
.ul-list {
  margin-block-start: 1.5em;
  padding-inline-start: 0px;
  padding: 15px;
}
.staggered-list {
  background: white;
  width: 260px;
  border-radius: 10px;
  z-index: -20;

  position: relative;
  top: 20%;
}
.v-enter-active,
.v-leave-active {
  transition: all 1s;
}
.v-enter, .v-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.search__box {
  position: absolute;
  top: 40%;
  left: 0%;
  //   transform: translate(-50%, -50%);
  background: #2f3640;
  height: 40px;
  border-radius: 40px;
  padding: 10px 15px 10px 15px;
}

.search__box:hover > .search__txt {
  width: 240px;
  padding: 0 6px;
}

.search__box:hover > .search__btn {
  background: #fff;
}
.search__box:hover > .search__btn i {
  color: #34ace0;
  transition: 0.9s;
}

.btn-contanier {
  @media (max-width: 36em) {
    display: none;
  }
}
.search__btn {
  color: #e84118;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #34ace0;
  display: flex;
  justify-content: center;
  // align-item: center;
  text-decoration: none;
}
.search__btn i {
  line-height: 40px;
  color: #fff;
  transition: 0.9s;
}

.search__txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #fff;
  font-size: 16px;
  transition: 0.2s;
  line-height: 40px;
  width: 0;
}
</style>