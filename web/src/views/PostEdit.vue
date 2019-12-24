<template>
  <div>
    <el-container>
      <el-aside class="collections" width="18%">
        <div class="d-flex flex-column">
          <el-button type="primary">
            <router-link to="/">回首页</router-link>
          </el-button>
          <div class="text-left lh-3">
            <div type="plain" class="point" @click="show=!show">
              <i class="el-icon-folder-add pl-4"></i> 新建文集
            </div>
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
            <ul class="lh-3 pr-3" v-for="collect in collections" :key="collect.id">
              <li
                :class="selectedCollection==collect.id?'d-flex jc-between bd-left':'d-flex jc-between'"
                type="primary"
                @click="selectCollect(collect.id)"
              >
                <div class="text-ellipsis">{{collect.name}}</div>
                <!-- <el-popconfirm title="这是一段内容确定删除吗？">
                  <el-button class="btn" icon="el-icon-s-tools" slot="reference"></el-button>
                </el-popconfirm>-->
                <el-dropdown class="text-white" trigger="click" @command="handleCollection">
                  <span>
                    <i class="el-icon-s-tools el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit-outline">修改文集</el-dropdown-item>

                    <el-dropdown-item icon="el-icon-delete" :command="collect.id">删除文集</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>
        </div>
      </el-aside>
      <el-aside class="postlist" width="23%" style="background-color:white;color:#333">
        <div type="primary" class="creatpost point pl-4" @click="creatPost">
          <i class="el-icon-circle-plus pr-2"></i>新建文章
        </div>
        <ul v-for="post in posts" :key="post.id">
          <li class="d-flex jc-between" type="primary" @click="selectPost(post.id)">
            <i class="el-icon-document fs-ll pt-4 pl-3"></i>

            <i>{{post.title}}</i>
            <!-- <i class="el-icon-s-tools pt-4 pr-2"> -->
            <el-dropdown
              placement="bottom-start"
              class="pr-3"
              trigger="hover"
              @command="handlePost"
            >
              <span>
                <i class="el-icon-s-tools el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit-outline">移动文章</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete" :command="post.id">删除文章</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- </i> -->
          </li>
        </ul>
      </el-aside>
      <el-main
        :style="!selectedPost?'display:flex;flex-direction:row;justify-content:center;align-items:center;':''"
      >
        <tinymce v-if="selectedPost" ref="tinymce" @submit="updatePost"></tinymce>

        <div v-else class="bg" style="flex:1">抒写</div>

        <markdown></markdown>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import tinymce from "../components/Tinymce/Tinymce.vue";
import markdown from "../components/markdown/MarkDown.vue";
import dayjs from "dayjs";
@Component({
  components: { tinymce, markdown }
})
export default class Post extends Vue {
  collections: any = [];
  newCollection: any = "";
  show: boolean = false;
  selectedCollection: number;
  selectedPost: number = null;
  posts: any = "";

  mounted() {
    this.fetchCollect();
  }
  async createCollect() {
    if (this.newCollection == "") {
      return this.$notify({
        title: "错误",
        type: "error",
        message: "文集不能为空"
      });
    }
    await this.$http.post("/collections", { name: this.newCollection });
    this.$notify({
      title: "成功",
      type: "success",
      message: "添加成功"
    });
    this.fetchCollect();
    this.show = false;
  }

  async selectCollect(id) {
    this.fetchPost(id);
  }

  async selectPost(id) {
    this.selectedPost = id;
    const res = await this.$http.get(`/posts/${id}`);

    this.$refs.tinymce.setContent(res.data.body);
  }

  async creatPost() {
    const now = dayjs(new Date()).format("YYYY-MM-DD");

    const data = {
      title: now,
      body: "",
      collection: this.selectedCollection
    };
    const res = await this.$http.post("/posts", data);
    this.selectCollect(this.selectedCollection);
  }

  async updatePost() {
    const body = this.$refs.tinymce.body;

    const data = {
      title: "now",
      body: body
    };
    const res = await this.$http.put(`/posts/${this.selectedPost}`, data);
    this.$notify({
      title: "成功",
      type: "success",
      message: "更新成功"
    });
  }

  async fetchCollect() {
    const res = await this.$http.get("/collections");
    this.collections = res.data;
    this.selectedCollection = res.data[0].id;
    this.fetchPost(this.selectedCollection);
  }

  async fetchPost(id) {
    const res = await this.$http.get(`/posts/collections/${id}`);
    this.selectedCollection = id;
    this.posts = res.data;
  }

  async handleCollection(command: number) {
    this.$confirm("此操作将永久删除该文集，是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        const res = await this.$http.delete(`/collections/${command}`);
        this.fetchCollect();
      })
      .catch(() => {
        return;
      });
  }
  async handlePost(command: number) {
    const res = await this.$http.delete(`/posts/${command}`);
    this.$notify({
      title: "成功",
      type: "success",
      message: "删除成功"
    });
    this.fetchPost(this.selectedCollection);
  }
}
</script>

<style lang="scss" scoped>
.postlist ul {
  position: relative;
  margin-bottom: 0;
  cursor: pointer;
  border-top: 1px solid #d9d9d9;

  li {
    height: 80px;
    line-height: 80px;
    list-style-type: none;
  }

  &:hover {
    background-color: #e6e6e6;
  }
}
.bd-left {
  border-left: 3px solid #ec7259;
}

.collections ul {
  position: relative;
  cursor: pointer;

  li {
    list-style-type: none;
    padding-left: 20px;
  }

  &:hover {
    background-color: #666;
  }
}
.creatpost {
  height: 60px;
  line-height: 60px;
  text-align: left;
}

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

.bg {
  font-size: 64px;
  color: #e6e6e6;
  text-shadow: 0 1px 0 #fff;
}
</style>
