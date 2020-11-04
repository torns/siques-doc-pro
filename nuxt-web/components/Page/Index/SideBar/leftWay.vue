<template>
  <ul
    :class="`text-left fs-xm  sq-leftside-link  ${color} flex-wrap`"
    style="
    display: flex;"
  >
    <li
      @click="$emit('handleclick', link)"
      v-for="link in links"
      :key="link.alias"
      :class="(link.alias == category ? 'bg-1 ' : 'hover-2 ') + `w-100  pl-3 py-2`"
    >
      <i :class="`text-${link.alias == category ? 'white' : link.color} fa   fa-${link.icon}`"></i>

      <span class="pl-1"> {{ link.name }}</span>
    </li>

    <div class="pl-3 py-2 xm ">技术频道</div>
    <li
      @click="$emit('handleclick', link)"
      v-for="link in techChanel"
      :key="link.alias"
      :class="(link.alias == category ? `bg-1 ` : 'hover-2 ') + `w-100  pl-3 py-2 `"
    >
      <i :class="`text-${link.alias == category ? 'white' : link.color} fs-md  iconfont   icon-${link.icon}`"></i>
      <i
        v-if="link.fontawesome"
        :class="`text-${link.alias == category ? 'white' : link.color} fs-md fa ${link.icon}`"
      ></i>
      <span class="pl-1">{{ link.name }}</span>
    </li>
    <router-link :to="`/tags`" class="w-100 " tag="li">
      <div class="pl-3   py-2 hover-2">
        <i class="fa fa-tag pr-1"></i>
        更多标签
      </div>
    </router-link>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class leftWay extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  taglists: Array<String> | undefined

  @Prop({
    type: String,
    default: 'text-gray-1'
  })
  color

  @Prop({
    type: String,
    default: 'dark'
  })
  textColor

  @Prop()
  category

  links = [
    {
      name: '最近更新',
      alias: 'new',
      sort: 'created',
      icon: 'lastfm',
      color: this.textColor
    },
    {
      name: '我的订阅',
      taglist: this.taglists,
      listId: true,
      sort: 'liked',
      icon: 'subscript',
      color: this.textColor
    },
    {
      name: '近期热门',
      alias: 'hot',
      sort: 'liked',
      icon: 'fire-extinguisher',
      color: this.textColor
    }
  ]

  techChanel = [
    {
      name: '小视频',
      alias: 'video',
      sort: 'created',
      fontawesome: true,
      icon: 'fa-youtube-play',
      color: 'red',
      type: 'video'
    },
    {
      name: '前端',
      alias: 'frontEnd',
      taglist: ['frontEnd'],
      sort: 'created',
      icon: 'js',
      color: 'yellow-1'
    },
    {
      name: '后端',
      alias: 'backEnd',
      taglist: ['cloudcomputing', 'database', 'server', 'JavaDev', 'backEnd'],
      sort: 'created',
      icon: 'storage',
      color: 'blue-1'
    },
    {
      name: '工具',
      alias: 'tools',
      taglist: ['tools'],
      sort: 'created',
      icon: 'tools',
      color: 'blue'
    },
    {
      name: 'Node',
      alias: 'node',
      tag: 'node.js',
      sort: 'created',
      icon: 'node-js',
      color: 'blue'
    },
    {
      name: 'Vue',
      alias: 'vue',
      tag: 'vue.js',
      sort: 'created',
      icon: 'vuejs',
      color: 'green'
    },
    {
      name: '小程序',
      alias: 'miniProgram',
      taglist: ['miniProgram'],
      sort: 'created',
      icon: 'xiaochengxu',
      color: 'green'
    },
    {
      name: 'Nuxt',
      alias: 'nuxt.js',
      tag: 'nuxt.js',
      sort: 'created',
      icon: 'nuxt-dot-js',
      color: 'green'
    },
    {
      name: 'Nest',
      alias: 'nest.js',
      tag: 'nest.js',
      sort: 'created',
      icon: 'file_type_nestjs',
      color: 'red'
    },
    {
      name: '行业',
      alias: 'info',
      tag: 'info',
      sort: 'created',
      icon: 'hangye',
      color: 'yellow'
    }
  ]
}
</script>

<style lang="scss" scoped></style>
