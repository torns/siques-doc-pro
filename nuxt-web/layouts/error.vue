<template>
  <div
    class="error-page"
    style="
    height: 100vh;
"
  >
    <div class="img"></div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">访问的页面不存在</div>
      <div class="actions">
        <router-link :to="{ path: '/' }">
          <el-button type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
<style lang="scss" scoped>
.img {
  background: url(../static/bg/404.svg) no-repeat;
}
</style>
