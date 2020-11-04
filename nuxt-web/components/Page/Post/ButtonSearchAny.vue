<template>
  <div class="btn-contanier">
    <div v-drag="`left`" class="search__box">
      <input v-model="query" class="search__txt" type="text" name placeholder="Type to search(vue)" />
      <a class="search__btn">
        <i class="fa fa-search" style="font-size:8px"></i>
      </a>

      <!-- <transition name="custom-classes-transition" enter-active-class="animated slideUp">
        <div v-if="query!=''" id="staggered-list-demo" class="staggered-list">
          <transition-group appear tag="ul" class="ul-list">
            <li
              v-for="(item, index) in computedList"
              v-bind:key="index"
              v-bind:data-index="index"
              style="list-style-type: none;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;"
            >
            <router-link :to="`/post/${item.title}`" @click.native="refresh"># {{ item.title }}</router-link>
            
            </li>
          </transition-group>
        </div>
      </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      techlist: ''
    }
  },
  // computed: {
  //   computedList: function() {
  //     var vm = this;
  //     return this.techlist.filter(function(item) {
  //       return item.title.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
  //     });
  //   }
  // },
  methods: {}
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
  position: fixed;
  top: 40%;
  left: 0%;
  //   transform: translate(-50%, -50%);
  background: #2f3640;
  height: 30px;
  border-radius: 20px;
  padding: 5px 7.5px 5px 7.5px;
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #34ace0;
  display: flex;
  justify-content: center;
  // align-item: center;
  text-decoration: none;
}
.search__btn i {
  line-height: 20px;
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
  font-size: 8px;
  transition: 0.2s;
  line-height: 20px;
  width: 0;
}
</style>
