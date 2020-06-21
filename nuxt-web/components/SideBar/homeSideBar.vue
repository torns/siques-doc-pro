<template>
  <div class="sidebar pl-2">
    <div class="bg-info border-1"></div>
    <div>
      <label>
        <input type="checkbox" />
        <div class=" card shadow-1 text-center">
          <div class="front">
            <div class="d-flex  ai-center jc-center">
              <p>Welcome to this site !<br /></p>
            </div>
          </div>

          <div class="back">
            <p class="pt-5">球球:943452349</p>
          </div>
        </div>
      </label>
    </div>

    <!-- <div class="hotTag">
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
    </div> -->
    <div>
      <div class="d-flex jc-between py-3 " style="margin-bottom:-12px">
        <div><i class="el-icon-s-management fs-lg text-green pr-2 "></i>笔记本本</div>

        <nuxt-link :to="`/n`" class="point text-primary" tag="a">更多 </nuxt-link>
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
              <el-avatar :src="comment.user.avator[0] ? comment.user.avator[0].url : ''" class="bg-white">
                <img src="~/static/avator.jpg" alt="" />
              </el-avatar>
            </div>
            <div class="pl-2 text-gray-1 fs-xs">
              <div>
                <el-popover placement="top-start" width="200" trigger="hover">
                  <el-avatar :src="comment.user.avator[0] ? comment.user.avator[0].url : ''" style="position:absolute;bottom:81%" class="shadow-1 bg-white" shape="circle">
                    <img src="~/static/avator.jpg" alt="" />
                  </el-avatar>
                  <div class="pt-3 text-primary">{{ comment.user.name }}</div>
                  <div class="fs-xm py-2 ellipsis-1">
                    {{ comment.user.introduction === null ? '这个用户很懒没有留下足迹' : comment.user.introduction }}
                  </div>
                  <div class="fs-xs">
                    <span class="text-blue-1">加入于</span>
                    {{ $dayjs(comment.user.created).format('YYYY年M月D日') }}
                  </div>

                  <span slot="reference" class="text-blue-1"> {{ comment.user.name }}</span>
                </el-popover>

                <span> {{ $dayjs(comment.created).fromNow() + $dayjs(comment.created).format('(M月D号)') }}</span>
              </div>
              <div class="ellipsis-1 my-1">
                {{ comment.body }}
              </div>
              <div class="ellipsis-1 text-primary">
                评:
                <router-link :to="`/p/${comment.post.id}`" tag="a" class="hoverlink point">{{ comment.post.title }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="d-flex jc-between pt-3">
        <div><i class="fa fa-bar-chart text-blue-1 pr-2 "></i>站点统计</div>
      </div>

      <!-- <sq-piechart :data="allSiteData"></sq-piechart> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import noteWall from '../noteWall/noteWall.vue'
import piechart from '~/components/miniComponents/piechart.vue'
// import hover from './hover.js'

@Component({
  components: { noteWall, 'sq-piechart': piechart }
})
export default class SideBar extends Vue {
  hotComments: any = this.$attrs.hotComments
  hotTags = this.$attrs.hotTags
  hotNotebooks = this.$attrs.hotNotebooks
  allSiteData: any = {}

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
label {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  display: block;
  // width: 265px;
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
  // padding: 20px 10px 0 10px;
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
