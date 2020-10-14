<template>
  <div class="h-100 d-flex">
    <div class="profile flex-1">
      <div class="profile__heading pt-5" style="background-color: #f6f6f6;">
        <div class="container">
          <el-row :gutter="15" type="flex">
            <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" class="mr-6">
              <div style="width:157.5px;height:157.5px">
                <div class="point">
                  <el-avatar :size="157.5" class="shadow-1">
                    <img
                      v-if="id ? avatorUrl : this.$store.state.auth.user.avator.length !== 0 ? this.$store.state.auth.user.avator[0].url : false"
                      :src="id ? avatorUrl : this.$store.state.auth.user.avator[0].url"
                      style="background-color:white;height: inherit;width: inherit;"
                      class="avatar"
                    />
                    <img v-else src="~/static/avator.jpg" />
                  </el-avatar>
                  <el-upload
                    :http-request="uploadAvator"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    class="avatar-uploader hover-5 text-center"
                    action="string"
                  >
                    <el-button v-if="!id" size="small" type="text">上传头像</el-button>
                  </el-upload>
                </div>

                <ul class="icon-list d-flex jc-between   pt-2">
                  <li class="hover-1 opacity25 text-dark-1 ">
                    <i class="iconfont icon-github fs-xll"></i>
                  </li>
                  <li class="hover-1 opacity25 text-orange">
                    <i class="iconfont icon-weibo fs-xll"></i>
                  </li>
                  <li class="hover-1 opacity25 text-blue">
                    <i class="iconfont icon-qq fs-xll"></i>
                  </li>
                  <li class="hover-1 opacity25 text-blue">
                    <i class="iconfont icon-twitter fs-xll"></i>
                  </li>
                  <li class="hover-1 opacity25 text-darkblue">
                    <i class="iconfont icon-tian7_facebook fs-xll"></i>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="12" :sm="9" :md="9" :lg="9" :xl="10">
              <div class="d-flex pb-1">
                <h2 style="font-weight:600" class="pr-4 text-ellipsis">
                  {{ id ? user.name : this.$store.state.auth.user.name }}
                </h2>
                <el-button type="text">查看完整档案</el-button>
              </div>
              <div class=" pb-3">
                <i class="iconfont icon-famous fs-lg"></i> 10
                <span class="opacity60">声望</span>
              </div>
              <ul class="opacity60 ">
                <li v-for="(link, index) in messageLinks" :key="index" class="pb-2 fs-xm hoverlink ">
                  <div v-if="show && showname == link.alias && !id" style="height:30px" class="d-flex ai-center ">
                    <el-input v-model="messageBox" :placeholder="link.placeholder" size="mini" style="width:200px;"></el-input>
                    <el-button @click="save(link.alias)" class="ml-3" type="text">保存</el-button>
                  </div>

                  <div v-else class="d-flex ai-baseline">
                    <i :class="`pr-2 iconfont icon-${link.icon}`"> </i>

                    <div @click="clickname(link.alias)">
                      <!-- 没有解决 -->
                      <div v-if="user != ''">
                        <div v-if="user[link.alias] !== null">
                          {{ user[link.alias] }}
                        </div>
                        <div v-else>暂无(ﾟ∀ﾟ )</div>
                      </div>
                      <div v-if="!id">
                        <div v-if="$store.state.auth.user[link.alias] != null">
                          {{ $store.state.auth.user[link.alias] }}
                        </div>
                        <div v-else>{{ link.name }}</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="10">
              <div class="border-radius">
                <div class="profile__heading--desc-heading" style="height:32px;background-color: #E3E3E3;border-radius: 5px 5px 0 0;"></div>

                <div class="profile__heading--desc-body px-2" style="height:210px;background-color: #EEEEEE;">
                  <div v-if="!id">
                    {{ $store.state.auth.user.introduction }}
                  </div>
                  <div v-else>
                    {{ user.introduction === null ? '暂时没有个人简介' : user.introduction }}
                  </div>
                  <div v-if="isAuth && $store.state.auth.user.introduction == null && !id">
                    暂时没有个人简介
                    <el-button @click="showIntroductionInput" type="text">,立即添加</el-button>
                  </div>
                  <div v-else>
                    <el-button v-if="!id" @click="showIntroductionInput" type="text">修改简介</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="container" style="min-height:100vh">
        <el-row :gutter="25" type="flex" style="flex-wrap:wrap" class="h-100 pt-4">
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="hidden-xs-and-down pb-3 " style="padding-top:10px">
            <div>
              <div class="d-flex flex-column jc-around">
                <div v-if="id && id != userId" class="d-flex jc-center pb-2">
                  <el-button @click="followUser" size="small" type="primary"> {{ isUser && isfan ? '已' : '加' }}关注</el-button>
                  <el-button @click="sendMessage" size="small" type="plain">发私信</el-button>
                </div>

                <div class="d-flex jc-around">
                  <div @click="handleComponent({ 0: 'followers' })" class="point">
                    <div>关注了</div>
                    <div v-if="user.length !== 0">
                      <span v-if="user.follows">{{ user.follows.length }}人</span>
                    </div>

                    <div v-else>
                      <span v-if="!$store.state.UserNotExist">{{ $store.state.auth.user.follows.length }}人</span>
                    </div>
                  </div>
                  <el-divider direction="vertical"></el-divider>

                  <div @click="handleComponent({ 0: 'Fans' })" class="pl-1 point">
                    <div>粉丝</div>
                    <div v-if="user.length !== 0">
                      <span v-if="user.user">{{ user.user.length }}人</span>
                    </div>
                    <div v-else>
                      <span v-if="!$store.state.UserNotExist">{{ $store.state.auth.user.user.length }}人</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <el-divider></el-divider>
              </div>
              <ul>
                <li :class="(defaultLink == link.alias ? 'bg-1 ' : '') + ' py-1 pl-2 fs-xm'" v-for="(link, index) in pageLinks" :key="index" @click="changeComponent(link.alias)">
                  <div class="d-flex jc-between">
                    <div>{{ link.name }}</div>
                    <div class="pr-3">{{ link.count }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
          <template>
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
              <!-- eslint-disable-next-line vue/require-component-is -->
              <component v-bind:is="currentComponent" :id="id" />
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="pt-2">
              <!-- eslint-disable-next-line vue/require-component-is -->
              <component :liked="id ? user.liked : $store.state.auth.user.liked" :id="id" :is="sideComponent" class="px-2" />
            </el-col>
          </template>
        </el-row>
      </div>
      <sq-footer top-border="true"></sq-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import Homepage from '~/components/Page/Homepage.vue'
import PostList from '~/components/Page/PostList.vue'
import Fans from '~/components/Page/Fans.vue'
import followerPanel from '~/components/Page/User/FollowerPanel/index.vue'
import followerSideBar from '~/components/Page/User/FollowerPanel/SideBar/followers.vue'

import HomePageBar from '~/components/Page/User/SideBar/homepage.vue'
// import Bookmark from '~/components/Page/Bookmark.vue'
import questionList from '~/components/Page/questionList.vue'
import noteList from '~/components/Page/noteList.vue'

@Component({
  components: {
    Homepage,
    PostList,
    questionList,
    HomePageBar,
    followerSideBar,
    noteList,
    Fans,
    followerPanel
    // Bookmark
  }
})
export default class Page extends Vue {
  head() {
    return {
      title: this.id ? '他' : '我' + '的主页'
    }
  }
  introduction: string = ''
  collections: string = ''
  defaultLink: string = 'Homepage'
  currentComponent: string = 'Homepage'
  sideComponent: string = 'HomePageBar'
  messageBox: string = ''
  show: boolean = false
  postCount: number = 0
  avatorUrl = ''
  showname: string = ''

  user: any = []
  isfan = false

  pageLinks: any = []
  messageLinks = [
    {
      name: '填写现居城市',
      alias: 'city',
      placeholder: '请填写城市',
      tag: 'far',
      icon: 'daqiashise'
    },
    {
      name: '填写毕业院校',
      alias: 'school',
      placeholder: '请填写院校',
      tag: 'far',
      icon: 'school'
    },
    {
      name: '填写所在公司/组织',
      alias: 'organization',
      placeholder: '请填写公司&组织',
      tag: 'far',
      icon: 'organization'
    },
    {
      name: '填写个人网站',
      alias: 'website',
      placeholder: '请填写网站地址',
      tag: 'fab',
      icon: 'weblist'
    }
  ]

  @Watch('currentComponent')
  isComponentChanged(newval: any, oldval: any) {
    switch (newval) {
      case 'Homepage':
        this.sideComponent = 'HomePageBar'
        break
      case 'followerPanel':
        this.sideComponent = 'followerSideBar'
        break

      default:
        this.sideComponent = ''
        break
    }
  }

  // TS中的计算属性
  get id(): any {
    try {
      return this.$route.params.id
    } catch {
      return null
    }
  }

  get userId() {
    try {
      return !this.$store.state.auth.user.id
    } catch {
      return ''
    }
  }

  get isUser(): any {
    return !this.$store.state.UserNotExist
  }

  get isAuth() {
    return this.$store.state.auth.user
  }

  @Watch('user')
  isValid(newval: any, oldval: any) {
    let isfan = false
    if (newval) {
      try {
        this.user.user.map((e: any) => {
          if (e.id === (this.$store.state.auth.user.id || '')) {
            isfan = true
          }
        })
      } catch {
        return
      }
      this.isfan = isfan
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

  async save(alias: any) {
    this.show = false
    const data = { [alias]: this.messageBox }
    if (this.messageBox && this.messageBox !== this.$store.state.auth.user[alias]) {
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

  showIntroductionInput() {
    this.$prompt(`修改你的简介:`, '简介', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputType: 'textarea',
      inputPlaceholder: '仅支持纯文本'
    })
      .then(async ({ value }: any) => {
        const data = {
          introduction: value
        }
        this.$store.commit('updataPersonData', data)
        await this.$http.put(`/users/${this.$store.state.auth.user.id}`, data)
        this.$notify({
          type: 'success',
          message: '更新成功',
          title: '成功'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
  }

  // 如果有id把这个用户的信息都查出来
  async fetchUser() {
    const pageLinks = [
      {
        name: `${this.id ? '他' : '我'}的主页`,
        alias: 'Homepage',
        nick: ''
      },
      {
        name: `${this.id ? '他' : '我'}的文章`,
        alias: 'PostList',
        nick: 'post'
      },
      // {
      //   name: `${this.id ? '他' : '我'}的回答`,
      //   alias: 'Answer',
      //   nick: ''
      // },
      {
        name: `${this.id ? '他' : '我'}的提问`,
        alias: 'questionList',
        nick: 'question'
      },
      {
        name: `${this.id ? '他' : '我'}的关注`,
        alias: 'followerPanel',
        nick: ''
      },
      {
        name: `${this.id ? '他' : '我'}的笔记`,
        alias: 'noteList',
        nick: 'note'
      },
      {
        name: `${this.id ? '他' : '我'}的收藏夹`,
        alias: 'bookmark',
        nick: ''
      }
    ]
    this.pageLinks = pageLinks

    if (this.id) {
      const res = await this.$http.get(`/users/${this.id}`)
      this.user = res.data
      //* 改变数组中的数据的重要步骤*/
      for (let index = 0; index < pageLinks.length; index++) {
        const nick = pageLinks[index].nick
        this.$set(this.pageLinks[index], 'count', res.data[nick])
      }

      try {
        this.avatorUrl = res.data.avator[0].url
      } catch {
        this.avatorUrl = ''
      }
    } else {
      for (let index = 0; index < pageLinks.length; index++) {
        const nick = pageLinks[index].nick
        this.$set(this.pageLinks[index], 'count', this.$store.state.auth.user[nick])
      }
    }
  }

  async uploadAvator(param: any) {
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

  handleAvatarSuccess(res: any, file: any) {
    this.avatorUrl = URL.createObjectURL(file.raw)
  }
  beforeAvatarUpload(file: any) {
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
  // 个人信息
  clickname(alias: any) {
    if (!this.id) {
      this.show = true
      this.messageBox = this.$store.state.auth.user[alias] || ''
      this.showname = alias
    }
  }

  async followUser() {
    if (this.isUser) {
      await this.$http.get(`users/${this.id}/follow`)
      if (this.isfan) {
        this.$notify({
          type: 'warning',
          message: '取消关注',
          title: '消息'
        })
      } else {
        this.$notify({
          type: 'success',
          message: '关注成功',
          title: '成功'
        })
      }

      this.isfan = !this.isfan
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  sendMessage() {
    this.$prompt(`发私信给 ${this.user.name}:`, '发私信', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputType: 'textarea',
      inputPlaceholder: '仅支持纯文本'
    })
      .then(async ({ value }: any) => {
        await this.$http.post(`/notification/${this.id}`, { content: value })
        this.$notify({
          type: 'success',
          message: '发送成功',
          title: '成功'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
  }
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
