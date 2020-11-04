<template>
  <el-row :gutter="43">
    <transition-group name="list-complete" tag="span">
      <el-col
        v-for="(note, index) in $attrs.data"
        :key="note.id"
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="8"
        class="py-3 pb-6 list-complete-item"
      >
        <div class="w-100 shadow-2 d-flex flex-column card-shadow" style="height:520px;border-radius:15px">
          <div class="pannel-head relative">
            <div class="pannel-tag absolute ">
              <div class="px-4 py-2 text-white text-center">
                {{ note.tags[0] ? note.tags[0].name : '♥' }}
              </div>
            </div>
            <router-link :to="`/${note.type == 'post' ? `p` : 'n'}/${note.id}`" class="pannel-image point">
              <el-image
                :src="note.cover || getRandomUrl(index)"
                class="w-100 image-hover"
                style="border-radius: 15px 15px 0 0;height:220px;"
                fit="cover"
              >
              </el-image>
            </router-link>
          </div>
          <div class="pannel-body flex-1 text-center text-dark">
            <div class="py-2 fs-xm  my-2">
              <i class="fa fa-paint-brush  pr-1"></i>
              <span>{{ $dayjs(note.created).format('YYYY-MM-DD') }}</span>
            </div>
            <h1>
              <router-link :to="`/${note.type == 'post' ? `p` : 'n'}/${note.id}`" class="ellipsis-1 title px-3">{{
                note.title
              }}</router-link>
            </h1>
            <div class="description text-gray ellipsis-3 pt-3">{{ note.alias }}...</div>
          </div>
          <div class="pannel-footer d-flex ai-center jc-between " style="height: 80px;border-top:1px solid #dbdbdb">
            <div class="d-flex ai-center">
              <div class="px-3">
                <router-link :to="`/u/${note.user.id}`">
                  <el-avatar
                    :size="40"
                    :src="note.user.avator[0] ? note.user.avator[0].url : ''"
                    class="shadow-2 note_avatar"
                    style="background-color: white ;border: 1px solid #de7d7d;padding: 3px;"
                  >
                    <img src="~/static/avator.jpg" />
                  </el-avatar>
                </router-link>
              </div>
              <div class="fs-xm text-gray">
                {{ note.user.name }}
              </div>
            </div>

            <div class="fs-xm text-gray pr-3">
              <i class="fa fa-fire pr-1"></i>
              <span>{{ note.views }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </transition-group>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import config from '~/plugins/config/website.js'
@Component({})
export default class NotePannel extends Vue {
  //  笔记展示面板
  array = []
  coverLink = config.link
  getRandomUrl(index: any) {
    return this.coverLink[index % this.coverLink.length].url
  }
}
</script>

<style lang="scss">
.note_avatar > img {
  border-radius: 50% !important;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
