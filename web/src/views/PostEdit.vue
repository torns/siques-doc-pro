<template>
  <div>
    <el-container>
      <el-aside width="18%">
        <div class="d-flex flex-column">
          <el-button type="primary">
            <router-link to="/">回首页</router-link>
          </el-button>
          <el-button type="plain" @click="show=!show">新建文集</el-button>
          <transition
            enter-active-class="animated slideInLeft"
            leave-active-class="animated slideOutLeft"
          >
            <div v-if="show">
              <el-input v-model="newCollection" placeholder="请输入文集名..."></el-input>
              <el-button type="plain" @click="createCollect">提交</el-button>
              <el-button type="text" @click="show=!show">取消</el-button>
            </div>
          </transition>
          <div v-for="collect in collections" :key="collect.id">
            <a href="#">{{collect.name}}</a>
          </div>
        </div>
      </el-aside>
      <el-aside width="23%" style="background-color:white;color:#333">
        <div>新建文章</div>
      </el-aside>
      <el-main>
        <tinymce></tinymce>
        <markdown></markdown>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import tinymce from "../components/Tinymce/Tinymce.vue";
import markdown from "../components/markdown/MarkDown.vue";
@Component({
  components: { tinymce, markdown }
})
export default class Post extends Vue {
  collections: any = [];
  newCollection: any = "";
  show: boolean = false;
  async createCollect() {
    await this.$http.post("/collections", { name: this.newCollection });
    this.$message("添加成功");
    this.fetchCollect();
    this.show = false;
  }
  mounted() {
    this.fetchCollect();
  }
  async fetchCollect() {
    const res = await this.$http.get("/collections");
    this.collections = res.data;
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #404040;
  color: white;
  text-align: center;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0 !important;
}
</style>
