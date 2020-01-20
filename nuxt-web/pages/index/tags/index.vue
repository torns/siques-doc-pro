<template>
  <div>
    <div class="container h-100">
      <el-row type="flex" class="pt-4 px-2">
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="24"
          style="min-height:60vh"
        >
          <div class="fs-xll pb-2">标签</div>
          <div>
            标签不仅能组织和归类你的内容，还能关联相似的内容。正确的使用标签将让你的问题被更多人发现和解决。
          </div>
          <div class="pt-4">
            <ul class="d-flex flex-wrap">
              <div
                v-for="(title, index) in titles"
                :key="index"
                class="tag-list__itemWraper fs-sm pb-4 w-100"
              >
                {{ title.name }}
                <div>
                  <el-divider></el-divider>
                </div>

                <ul class="d-flex flex-wrap" style="width:95%">
                  <li
                    v-for="(tag, index) in title.tags"
                    :key="index"
                    style="padding:2px 5px; "
                    class="bg-3 mr-1 my-1 hover-3 fs-xm"
                  >
                    <!-- 会报错暂时先不用 -->
                    <!-- <font-awesome-icon   :icon="['fab', tag]" class="fs-xm" /> -->
                    {{ tag }}
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-footer :show="true"></el-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Tags extends Vue {
  titles = [
    {
      name: '开发语言',
      tags: ['java', 'c', 'c++', 'php', 'python', 'javascript', 'typescript']
    },
    {
      name: '前端开发',
      tags: [
        'html',
        'nuxt.js',
        'html5',
        'css3',
        'jquery',
        'json',
        'axios',
        'vue.js'
      ]
    },
    {
      name: '数据库',
      tags: ['mysql', 'mongodb']
    },

    { name: '开发工具', tags: ['visual-studio', 'docker', 'git', 'git-hub'] },
    {
      name: '云计算',
      tags: ['阿里云', '腾讯云']
    },
    {
      name: '服务器',
      tags: ['linux', 'ubunto', 'centos', 'apache', 'nginx']
    },
    {
      name: 'JavaScript开发',
      tags: ['javascript', 'node.js', 'firefox', 'chrome']
    },
    { name: '小程序开发', tags: ['微信小程序'] }
  ]
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 10px 0;
  width: 90%;
}
</style>
