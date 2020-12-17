<template>
  <v-container>
    <v-row justify="center" class="pt-3 collection">
      <v-col
        v-for="(collect, index) in collects"
        :key="collect.id"
        class="pb-2 list-complete-item"
        cols="12"
        md="12"
        sm="12"
        lg="12"
        xl="12"
        xs="12"
      >
        <v-row v-if="collect.docIds != null" justify="center" class="collection_wrapper d-flex flex-wrap ">
          <v-col :class="index % 2 == 1 ? colLast : colFirst" xs="12" sm="9" md="8" lg="6" xl="5">
            <router-link :to="`/doc/${collect.docIds[0]}`" target="_blank" class="pannel-image pointer">
              <v-img :src="collect.cover" cover style="height:350px;border-radius:20px;"></v-img>
            </router-link>
          </v-col>
          <v-col
            :class="`${index % 2 == 0 ? colLast : colFirst} d-flex flex-column jc-center`"
            xs="12"
            sm="3"
            md="4"
            lg="6"
            xl="5"
          >
            <div class="description   ">
              <div>
                <!-- <div class="header py-1  text-gray fs-xm">
                  <i class="fa fa-leaf   pr-2"></i
                  ><span @click="$router.push(`/t/${post.tags[0] ? post.tags[0].id : '1'}`)" class="point">{{
                    post.tags[0] ? post.tags[0].name : ''
                  }}</span>
                </div> -->
                <router-link
                  :to="`/doc/${collect.docIds && collect.docIds[0]}`"
                  tag="span"
                  target="_blank"
                  class="pannel-image point"
                >
                  <h2 class=" pb-2  fs-xll ellipsis-1">{{ collect.name }}</h2>
                </router-link>
                <div class="pr-3">
                  <p class="alias pb-2  fs-xm">{{ collect.description }}...</p>
                </div>
                <div class="footer pt-4 d-flex ">
                  <div class="pr-2">
                    <v-avatar
                      :size="44"
                      :src="collect.user.avatar ? collect.user.avatar : ''"
                      class="note_avatar"
                      style="background-color: white ;border: 1px solid #de7d7d;"
                    >
                      <img
                        style="padding: 4px;"
                        src="https://shuxie.oss-cn-hangzhou.aliyuncs.com/avator/1/2020-02-18/06216_large.png"
                      />
                    </v-avatar>
                  </div>
                  <div class="fs-xs pt-2 text-gray">
                    <div><i class="fa fa-clock-o pr-2"></i>{{ $dayjs(collect.created).format('YYYY-MM-DD') }}</div>
                    <div><i class="fa fa-quote-right pr-1"></i> {{ Math.ceil(Math.random() * 4) }}分钟阅读</div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class CollectionList extends Vue {
  reveal = false
  @Prop()
  collects

  get colLast() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return ''
      case 'sm':
        return 'order-lg-last'
      case 'md':
        return 'order-lg-last'
      case 'lg':
        return 'order-lg-last'
      case 'xl':
        return 'order-lg-last'
    }
  }

  get colFirst() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return ''
      case 'sm':
        return 'order-lg-first'
      case 'md':
        return 'order-lg-first'
      case 'lg':
        return 'order-lg-first'
      case 'xl':
        return 'order-lg-first'
    }
  }
}
</script>

<style lang="scss">
.note_avatar > img {
  border-radius: 50% !important;
}
.collection {
  .list-complete-item {
    transition: all 1s;
    // display: inline-block;
  }
}
.collection_wrapper {
  .el-image__inner {
    transform: scale(1, 1);
    transition: transform 1s;
    &:hover {
      transform: scale(1.05, 1.05);
    }
  }
}

.order-lg-last {
  -ms-flex-order: 13;
  order: 13;
}

.order-lg-first {
  -ms-flex-order: -1;
  order: -1;
}
</style>
