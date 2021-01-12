<template>
  <OssFinder
    v-model="visible"
    :credential="credential"
    :user-path="`post/1/`"
    :max-keys="10"
    :parallel="3"
    :part-size="1024 * 1024"
    @dblclick="dblclick"
    @get-credential="getCredential"
  >
  </OssFinder>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { getToken } from '@/api/file'
@Component({})
export default class OssFinderWraper extends Vue {
  credential = {
    accessKeyId: '',
    accessKeySecret: '',
    securityToken: '',
    expiration: '',

    region: 'oss-cn-hangzhou',
    bucket: 'shuxie'
  }

  visible = false

  dblclick(file) {
    this.$emit('dblclick', file)
  }

  getCredential(done) {
    // 从后端获取临时ststoken，覆盖this.credential即可
    /* eslint-disable */
    getToken().then((result) => {
      this.credential.accessKeyId = result.datas.accessKeyId
      this.credential.accessKeySecret = result.datas.accessKeySecret
      this.credential.securityToken = result.datas.securityToken
      this.credential.expiration = result.datas.expiration
      done() //调用 done 进行 ossclient的初始化
    })
  }
}
</script>

<style lang="scss" scoped></style>
