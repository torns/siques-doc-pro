<template>
  <div class="sidebar pl-2">
    <div class="bg-info border-1"></div>
    <div>
      <label>
        <input type="checkbox" />
        <div class="card shadow-1">
          <div class="front">
            欢迎您访问本站点！如果解决了您的问题的话，请一定给个赞哦！
          </div>
          <div class="back">球球:943452349</div>
        </div>
      </label>
    </div>

    <div class="hotTag">
      <div class="d-flex jc-between py-3">
        <div><i class="fa fa-tags text-blue pr-2 "></i>热门标签</div>
        <div class="text-primary">
          <router-link :to="`/tags`" tag="li">更多</router-link>
        </div>
      </div>

      <div class="tiles">
        <div>
          <div v-for="(item, index) in hotTags" :key="index" class="col">
            <a :href="`/t/${item.id}`"
              ><span style="opacity: 0;">{{ item.name }}</span></a
            >
            <a :href="`/t/${item.id}`"></a>
            <a :href="`/t/${item.id}`"></a>
            <a :href="`/t/${item.id}`"></a>
            <div :style="`--card: '${item.name}`" class="box"></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex jc-between py-3 " style="margin-bottom:-12px">
        <div>
          <i class="el-icon-s-management fs-lg text-green pr-2 "></i>笔记本本
        </div>

        <nuxt-link :to="`/n`" class="point text-primary" tag="a"
          >更多
        </nuxt-link>
      </div>
      <div>
        <noteWall :hotNotebooks="hotNotebooks"></noteWall>
      </div>
    </div>

    <div style="margin-top:-12px">
      <div class="d-flex jc-between py-3">
        <div><i class="fa fa-fire text-orange pr-2 fs-lg"></i> 精彩评论</div>
        <!-- <div class="text-primary">更多</div> -->
      </div>
      <div>
        <div v-for="comment in hotComments" :key="comment.id" class="py-2">
          <div class="d-flex">
            <div>
              <el-avatar
                :src="comment.user.avator[0] ? comment.user.avator[0].url : ''"
                shape="square"
              >
                <img src="~/static/avator.jpg" alt="" />
              </el-avatar>
            </div>
            <div class="pl-2 text-gray-1 fs-xs">
              <div>
                <el-popover placement="top-start" width="200" trigger="hover">
                  <el-avatar
                    :src="
                      comment.user.avator[0] ? comment.user.avator[0].url : ''
                    "
                    style="position:absolute;bottom:81%"
                    class="shadow-1"
                    shape="circle"
                  >
                    <img src="~/static/avator.jpg" alt="" />
                  </el-avatar>
                  <div class="pt-3 text-primary">{{ comment.user.name }}</div>
                  <div class="fs-xm py-2 ellipsis-1">
                    {{
                      comment.user.introduction === null
                        ? '这个用户很懒没有留下足迹'
                        : comment.user.introduction
                    }}
                  </div>
                  <div class="fs-xs">
                    <span class="text-blue-1">加入于</span>
                    {{ $dayjs(comment.user.created).format('YYYY年M月D日') }}
                  </div>

                  <span slot="reference" class="text-blue-1">
                    {{ comment.user.name }}</span
                  >
                </el-popover>

                <span>
                  {{
                    $dayjs(comment.created).fromNow() +
                      $dayjs(comment.created).format('(M月D号)')
                  }}</span
                >
              </div>
              <div class="ellipsis-1 my-1">
                {{ comment.body }}
              </div>
              <div class="ellipsis-1 text-primary">
                评:
                <router-link
                  :to="`/p/${comment.post.id}`"
                  tag="a"
                  class="hoverlink point"
                  >{{ comment.post.title }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="d-flex jc-between py-3">
        <div><i class="fa fa-bar-chart text-blue-1 pr-2 "></i>站点统计</div>
      </div>
      <div class="d-flex flex-wrap jc-between">
        <div
          v-for="(data, index) in siteDatas"
          :key="index"
          class="fs-xm col-50 text-darkblue py-1 "
        >
          {{ data.title }} {{ allSiteData[data.alias] }} {{ data.classifier }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import noteWall from '../noteWall/noteWall.vue'
// import hover from './hover.js'

@Component({
  components: { noteWall }
})
export default class SideBar extends Vue {
  hotComments: any = this.$attrs.hotComments
  hotTags = this.$attrs.hotTags
  hotNotebooks = this.$attrs.hotNotebooks
  allSiteData: any = {}
  siteDatas = [
    { title: '文章总数:', alias: 'post', classifier: '篇' },
    { title: '提问总数:', alias: 'question', classifier: '条' },
    { title: '笔记总数:', alias: 'note', classifier: '个' },
    { title: '专栏总数:', alias: 'collection', classifier: '个' },
    { title: '评论总数:', alias: 'comment', classifier: '条' },
    { title: '回答总数:', alias: 'answer', classifier: '条' },
    { title: '标签总数:', alias: 'tag', classifier: '个' },
    { title: '注册用户:', alias: 'user', classifier: '人' }
  ]

  mounted() {
    this.fetchAll()
  }

  async fetchAll() {
    const res = await this.$http.get('users/1/all')
    this.allSiteData = res.data
  }
}
</script>

<style lang="scss" scoped>
.tiles {
  //   top: 50%;
  //   left: 50%;
  //   transform: translateX(-50%) translateY(-50%);
  width: 300px;
  height: 270px;
  perspective: 1000px;
}

.col {
  position: relative;
  float: left;
  margin: 6px;
  width: calc(150px - 95px);
  height: calc(150px - 95px);
  a {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    &:nth-child(1) {
      -webkit-clip-path: polygon(0 0, 100% 0, 50% 50%);
      clip-path: polygon(0 0, 100% 0, 50% 50%);
    }
    &:nth-child(2) {
      -webkit-clip-path: polygon(100% 0, 100% 100%, 50% 50%);
      clip-path: polygon(100% 0, 100% 100%, 50% 50%);
    }
    &:nth-child(3) {
      -webkit-clip-path: polygon(0 100%, 50% 50%, 100% 100%);
      clip-path: polygon(0 100%, 50% 50%, 100% 100%);
    }
    &:nth-child(4) {
      -webkit-clip-path: polygon(0 0, 50% 50%, 0 100%);
      clip-path: polygon(0 0, 50% 50%, 0 100%);
    }
    &:hover {
      z-index: 3;
      -webkit-clip-path: none;
      clip-path: none;
    }
    &:nth-child(1):hover ~ .box {
      transform: rotateX(180deg);
    }
    &:nth-child(2):hover ~ .box {
      transform: rotateY(180deg);
    }
    &:nth-child(3):hover ~ .box {
      transform: rotateX(-180deg);
    }
    &:nth-child(4):hover ~ .box {
      transform: rotateY(-180deg);
    }
    &:nth-child(1):hover ~ .box:after,
    &:nth-child(3):hover ~ .box:after {
      transform: rotateX(-180deg);
    }
    &:nth-child(2):hover ~ .box:after,
    &:nth-child(4):hover ~ .box:after {
      transform: rotateY(-180deg);
    }
  }
  .box {
    position: absolute;
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transform-style: preserve-3d;
    transition: transform 0.3s ease-in-out;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: 20px;

      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      border-radius: 2px;
      z-index: 2;
      backface-visibility: hidden;
    }
    &:after {
      content: var(--card);
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 0 0 0 4px;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      background: #333;
      color: #fff;
      font-size: 12px;

      border-radius: 2px;
      transition-delay: 0.15s;
    }
  }
  &:nth-child(1) .box:before {
    content: '\f198';
    background: #3f51b5;
  }
  &:nth-child(1) .box:after {
    background: #3f51b5;
  }
  &:nth-child(2) .box:before {
    content: '\f099';
    background: #1da1f2;
  }
  &:nth-child(2) .box:after {
    background: #1da1f2;
  }
  &:nth-child(3) .box:before {
    content: '\f0d5';
    background: #dc4a38;
  }
  &:nth-child(3) .box:after {
    background: #dc4a38;
  }
  &:nth-child(4) .box:before {
    content: '\f0e1';
    background: #006699;
  }
  &:nth-child(4) .box:after {
    background: #006699;
  }
  &:nth-child(5) .box:before {
    content: '\f173';
    background: #36465d;
  }
  &:nth-child(5) .box:after {
    background: #36465d;
  }
  &:nth-child(6) .box:before {
    content: '\f13b';
    background: #f16528;
  }
  &:nth-child(6) .box:after {
    background: #f16528;
  }
  &:nth-child(7) .box:before {
    content: '\f13c';
    background: #0170ba;
  }
  &:nth-child(7) .box:after {
    background: #0170ba;
  }
  &:nth-child(8) .box:before {
    content: '\f19a';
    background: #21759b;
  }
  &:nth-child(8) .box:after {
    background: #21759b;
  }
  &:nth-child(9) .box:before {
    content: '\f09b';
    background: #323131;
  }
  &:nth-child(9) .box:after {
    background: #323131;
  }
  &:nth-child(10) .box:before {
    content: '\f1cb';
    background: #000000;
  }
  &:nth-child(10) .box:after {
    background: #000000;
  }
  &:nth-child(11) .box:before {
    content: '\f268';
    background: #fec540;
  }
  &:nth-child(11) .box:after {
    background: #fec540;
  }
  &:nth-child(12) .box:before {
    content: '\f269';
    background: #ef8043;
  }
  &:nth-child(12) .box:after {
    background: #ef8043;
  }
  &:nth-child(13) .box:before {
    content: '\f282';
    background: #2c74be;
  }
  &:nth-child(13) .box:after {
    background: #2c74be;
  }
  &:nth-child(14) .box:before {
    content: '\f267';
    background: #409ed4;
  }
  &:nth-child(14) .box:after {
    background: #409ed4;
  }
  &:nth-child(15) .box:before {
    content: '\f26a';
    background: #cc0f15;
  }
  &:nth-child(15) .box:after {
    background: #cc0f15;
  }
  &:nth-child(16) .box:before {
    content: '\f179';
    background: #000000;
  }
  &:nth-child(16) .box:after {
    background: #000000;
  }
}
////

label {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  display: block;
  width: 265px;
  height: 130px;
  cursor: pointer;
}

.card {
  position: relative;
  height: 100%;
  width: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: all 600ms;
  transition: all 600ms;
  z-index: 20;
}

.card div {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #fcf8e3;
  text-align: center;
  line-height: 30px;
  padding: 37px 10px 0 10px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 2px;
}

.card .back {
  background: #222;
  color: #fff;
  -webkit-transform: rotateX(180deg);
  transform: rotateX(180deg);
}

label:hover .card {
  -webkit-transform: rotateX(20deg);
  transform: rotateX(20deg);
  box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
}

input {
  display: none;
}

:checked + .card {
  transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);
}

label:hover :checked + .card {
  transform: rotateX(160deg);
  -webkit-transform: rotateX(160deg);
  box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
}
</style>
