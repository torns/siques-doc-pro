<template>
  <div class="h-100 d-flex">
    <div class="profile flex-1">
      <div class="profile__heading pt-5" style="background-color: #f6f6f6;">
        <div class="container">
          <el-row :gutter="15" type="flex">
            <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" class="mr-6">
              <div style="width:157.5px;height:157.5">
                <div class="point">
                  <el-avatar :size="157.5" style="width:auto" class="shadow-1">
                    <img
                      v-if="
                        id
                          ? avatorUrl
                          : this.$store.state.auth.user.avator.length !== 0
                          ? this.$store.state.auth.user.avator[0].url
                          : false
                      "
                      :src="
                        id
                          ? avatorUrl
                          : this.$store.state.auth.user.avator[0].url
                      "
                      style="background-color:white;"
                      class="avatar"
                    />
                    <img src="~/static/avator.jpg" />
                  </el-avatar>
                  <el-upload
                    :http-request="uploadAvator"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    class="avatar-uploader hover-5 text-center"
                    action="string"
                  >
                    <el-button v-if="!id" size="small" type="text"
                      >上传头像</el-button
                    >
                  </el-upload>
                </div>

                <ul class="icon-list d-flex jc-between fs-xl pt-2">
                  <li class="hover-1 opacity25 text-dark-1">
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </li>
                  <li class="hover-1 opacity25 text-orange">
                    <font-awesome-icon :icon="['fab', 'weibo']" />
                  </li>
                  <li class="hover-1 opacity25 text-blue">
                    <font-awesome-icon :icon="['fab', 'invision']" />
                  </li>
                  <li class="hover-1 opacity25 text-blue">
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                  </li>
                  <li class="hover-1 opacity25 text-darkblue">
                    <font-awesome-icon :icon="['fab', 'facebook']" />
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="12" :sm="9" :md="9" :lg="9" :xl="10">
              <div class="d-flex pb-1">
                <h2 class="pr-4 text-ellipsis">
                  {{ id ? user.name : this.$store.state.auth.user.name }}
                </h2>
                <el-button type="text">查看完整档案</el-button>
              </div>
              <div class="fs-xl pb-3">
                <font-awesome-icon
                  :icon="['fas', 'american-sign-language-interpreting']"
                  class="pr-2"
                />10
                <span class="opacity60">声望</span>
              </div>
              <ul class="opacity60 ">
                <li
                  v-for="(link, index) in messageLinks"
                  :key="index"
                  class="pb-2 fs-xm hoverlink "
                >
                  <div
                    v-if="show && showname == link.alias && !id"
                    style="height:30px"
                    class="d-flex ai-center "
                  >
                    <el-input
                      v-model="messageBox"
                      :placeholder="link.placeholder"
                      size="mini"
                      style="width:200px;"
                    ></el-input>
                    <el-button
                      @click="save(link.alias)"
                      class="ml-3"
                      type="text"
                      >保存</el-button
                    >
                  </div>

                  <div v-else class="d-flex ai-baseline">
                    <font-awesome-icon
                      :icon="[link.tag, link.icon]"
                      class="pr-2"
                    />
                    <div
                      @click="
                        ;(show = true),
                          (messageBox =
                            $store.state.auth.user[link.alias] || ''),
                          (showname = link.alias)
                      "
                    >
                      <!-- 没有解决 -->

                      <div v-if="$store.state.auth.user[link.alias] != null">
                        {{ $store.state.auth.user[link.alias] }}
                      </div>
                      <div v-else>{{ link.name }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="10">
              <div class="border-radius">
                <div
                  class="profile__heading--desc-heading"
                  style="height:32px;background-color: #E3E3E3;border-radius: 5px 5px 0 0;"
                ></div>
                <div
                  class="profile__heading--desc-body"
                  style="height:210px;background-color: #EEEEEE;"
                >
                  暂时没有个人简介,
                  <el-button type="text">立即添加</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="container" style="min-height:100vh">
        <el-row
          :gutter="20"
          type="flex"
          style="flex-wrap:wrap"
          class="h-100 pt-4"
        >
          <el-col
            :xs="24"
            :sm="24"
            :md="4"
            :lg="4"
            :xl="4"
            class="hidden-xs-and-down pb-3"
          >
            <div>
              <div class="d-flex jc-around">
                <div @click="handleComponent({ 0: 'Followers' })" class="point">
                  <div>关注了</div>
                  <span v-if="user.follows">{{ user.follows.length }}人</span>
                  <span v-else
                    >{{ $store.state.auth.user.follows.length }}人</span
                  >
                </div>
                <el-divider direction="vertical"></el-divider>

                <div @click="handleComponent({ 0: 'Fans' })" class="pl-1 point">
                  <div>粉丝</div>
                  <span v-if="user.user">{{ user.user.length }}人</span>
                  <span v-else>{{ $store.state.auth.user.user.length }}人</span>
                </div>
              </div>
              <div>
                <el-divider></el-divider>
              </div>
              <ul>
                <li
                  :class="
                    (defaultLink == link.alias ? 'bg-1 ' : '') +
                      ' py-1 pl-2 fs-xm'
                  "
                  v-for="(link, index) in pageLinks"
                  :key="index"
                  @click="changeComponent(link.alias)"
                >
                  <div class="d-flex jc-between">
                    <div>{{ link.name }}</div>
                    <div class="pr-3">{{ link.count }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
            <!-- eslint-disable-next-line vue/require-component-is -->
            <component v-bind:is="currentComponent" :id="id" />
          </el-col>
          <el-col
            :xs="0"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
            class="hidden-sm-and-down"
          >
            <!-- eslint-disable-next-line vue/require-component-is -->
            <component :is="currentComponent === 'Homepage' ? 'SideBar' : ''" />
          </el-col>
        </el-row>
      </div>
      <sq-footer topBorder="true"></sq-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Homepage from '~/components/Page/Homepage.vue'
import PostList from '~/components/Page/PostList.vue'
import Fans from '~/components/Page/Fans.vue'
import Followers from '~/components/Page/Followers.vue'

import SideBar from '~/components/Page/SideBar.vue'
import Bookmark from '~/components/Page/Bookmark.vue'
import questionList from '~/components/Page/questionList.vue'
import noteList from '~/components/Page/noteList.vue'

@Component({
  components: {
    Homepage,
    PostList,
    questionList,
    SideBar,
    noteList,
    Fans,
    Followers,
    Bookmark
  }
})
export default class Page extends Vue {
  asyncData({ params }) {
    const id = params.id // When calling /abc the slug will be "abc"
    console.log(123, id)
  }

  introduction: string = ''
  collections: string = ''
  defaultLink: string = 'Homepage'
  currentComponent: string = 'Homepage'
  messageBox: string = ''
  show: boolean = false
  postCount: number = 0
  avatorUrl = ''
  showname: string = ''
  user: any = ''
  pageLinks: any = []
  messageLinks = [
    {
      name: '填写现居城市',
      alias: 'city',
      placeholder: '请填写城市',
      tag: 'far',
      icon: 'address-card'
    },
    {
      name: '填写毕业院校',
      alias: 'school',
      placeholder: '请填写院校',
      tag: 'far',
      icon: 'thumbs-up'
    },
    {
      name: '填写所在公司/组织',
      alias: 'organization',
      placeholder: '请填写公司&组织',
      tag: 'far',
      icon: 'compass'
    },
    {
      name: '填写个人网站',
      alias: 'website',
      placeholder: '请填写网站地址',
      tag: 'fab',
      icon: 'js-square'
    }
  ]

  // TS中的计算属性
  get id(): any {
    try {
      return this.$route.params.id
    } catch {
      return null
    }
  }

  mounted() {
    this.fetchUser()
  }

  async fetchCollect() {
    const res = await this.$http.get('/collections')
    this.collections = res.data
  }

  // //查询粉丝
  // async fetchFollowers() {
  //   const res = await this.$http.get(`/users/${this.id}/whofollows`);
  //   this.fans = res.data;
  // }

  // 查询关注的人

  changeComponent(alias: any) {
    this.defaultLink = alias
    this.currentComponent = alias
  }
  // 关注&&粉丝
  handleComponent(e: any) {
    this.defaultLink = ''
    this.currentComponent = `${e[0]}`
  }

  async save(alias) {
    this.show = false
    const data = { [alias]: this.messageBox }
    if (
      this.messageBox &&
      this.messageBox !== this.$store.state.auth.user[alias]
    ) {
      await this.$http.put(`/users/${this.$store.state.auth.user.id}`, data)
      this.$notify({
        type: 'success',
        message: '保存成功',
        title: '成功'
      })
      this.$store.commit('updataPersonData', data)
    }

    this.messageBox = ''
  }

  // 如果有id把这个用户的信息都查出来
  async fetchUser() {
    const pageLinks = [
      {
        name: `${this.id ? '他' : '我'}的主页`,
        alias: 'Homepage'
      },
      {
        name: `${this.id ? '他' : '我'}的文章`,
        alias: 'PostList'
      },
      {
        name: `${this.id ? '他' : '我'}的回答`,
        alias: 'Que'
      },
      {
        name: `${this.id ? '他' : '我'}的提问`,
        alias: 'questionList'
      },
      {
        name: `${this.id ? '他' : '我'}的关注`,
        alias: 'followers'
      },
      {
        name: `${this.id ? '他' : '我'}的笔记`,
        alias: 'noteList'
      },
      {
        name: `${this.id ? '他' : '我'}的收藏夹`,
        alias: 'bookmark'
      }
    ]
    this.pageLinks = pageLinks

    if (this.id) {
      const res = await this.$http.get(`/users/${this.id}`)
      this.user = res.data
      //* 改变数组中的数据的重要步骤*/
      this.$set(this.pageLinks[1], 'count', res.data.posts.length)

      try {
        this.avatorUrl = res.data.avator[0].url
      } catch {
        this.avatorUrl = ''
      }
    } else {
      const count = this.$store.state.auth.user.posts.length

      this.$set(this.pageLinks[1], 'count', count)
    }
  }

  async uploadAvator(param) {
    const params = new FormData()

    params.append('avator', param.file, param.file.name)

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const res = await this.$http.post('/avators', params, config)
    this.$store.commit('uploadUserAvator', res.data.url)

    this.$notify({
      title: '成功',
      type: 'success',
      message: '上传成功'
    })
  }

  // 头像上传相关

  handleAvatarSuccess(res, file: any) {
    this.avatorUrl = URL.createObjectURL(file.raw)
  }
  beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'

    const isLt2M = file.size / 1024 / 1024 < 0.5

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 500k!')
    }
    return isJPG && isLt2M
  }

  edit() {}
}
</script>

<style lang="scss" scoped>
.el-divider--vertical {
  height: inherit;
}
.el-divider--horizontal {
  margin: 12px 0;
}

.profile__heading .el-row {
  flex-wrap: none;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
}
</style>
