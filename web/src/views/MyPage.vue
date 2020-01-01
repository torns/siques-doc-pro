<template>
  <div class="contanier h-100 d-flex">
    <div class="leftside"></div>
    <div class="main">
      <div class="pt-5">
        <div class="d-flex jc-between" style="width:500px">
          <!-- <el-avatar
            :size="75"
            v-show="message.avator.url"
            :src="message.avator.url"
            class="shadow-1"
          ></el-avatar>-->
          <div class="title d-flex">
            <el-avatar :size="75" src="../assets/avator.jpg" class="shadow-1">
              <img src="https://shuxie.oss-cn-hangzhou.aliyuncs.com/avator/avator.jpg" />
            </el-avatar>

            <div class="pl-4 pt-1">
              <span class="fs-xl">{{this.$store.state.userName}}</span>
              <div class="d-flex pt-2 fs-xs">
                <div>
                  <div>{{this.$store.state.postLength}}</div>
                  <div>文章></div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div>
                  <div>0</div>
                  <div>字数></div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div>
                  <div>0</div>
                  <div>收获喜欢</div>
                </div>
                <el-divider direction="vertical"></el-divider>
              </div>
            </div>
          </div>
          <div>
            <el-button type="plain" round>发简信</el-button>
            <el-button type="primary" round icon="el-icon-edit">关注</el-button>
          </div>
        </div>
      </div>

      <div>
        <page-component :name="this.name"></page-component>
      </div>
    </div>
    <div class="sidebar" style="margin-left:0px">
      <div class="pt-5 d-flex flex-column" style="width: 280px;">
        <img
          style=" height: 186px"
          src="https://oimagec4.ydstatic.com/image?id=-5397300958976572132&product=adpublish&w=560&h=373&sc=0&rm=2&gsb=0&gsbd=60"
          alt
        />
        <div class="pt-3 text-gray d-flex jc-between" style="align-items: baseline;">
          <div>个人介绍</div>
          <div class="el-icon-edit">
            <el-button type="text" @click="edit">编辑</el-button>
          </div>
        </div>
        <el-input style="width:280px" v-model="introduction" type="text" label></el-input>
        <div class="py-2">
          <el-divider>
            <i class="el-icon-star-off"></i>
          </el-divider>
        </div>
        <div class="py-2">我关注的专题/文集/连载</div>

        <div class="py-2">我喜欢的文章</div>

        <el-divider>
          <i class="el-icon-mobile-phone"></i>
        </el-divider>
        <div>
          <div class="py-2 text-gray">我的文集</div>
          <ul>
            <li v-for="(collection,index) in collections" :key="index">
              <i class="el-icon-s-management pr-2"></i>
              {{collection.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PageComponent from "../components/Mypage/PageComponent.vue";
import dayjs from "dayjs";
@Component({
  components: { "page-component": PageComponent }
})
export default class MyPage extends Vue {
  @Prop()
  name: string;
  introduction: string = "";
  collections: string = "";
  mounted() {
    this.fetchCollect();
  }

  async fetchCollect() {
    const res = await this.$http.get("/collections");
    this.collections = res.data;
  }

  edit() {}
}
</script>

<style lang="scss" scoped>
.main {
  min-width: 36em;

  height: 100%;
}

.el-divider--vertical {
  height: inherit;
}
.el-divider--horizontal {
  margin: 12px 0;
}
.el-avatar {
  background: white;
}
</style>