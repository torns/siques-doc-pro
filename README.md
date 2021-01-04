<h1 align="center">💊SiquesDoc从思考、到创造--一个极简的私有文档书写平台</h1>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href=""><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
</p>

## 👩‍🌾 简介

`Siques-Doc` 是基于`Java`开发的在线文档系统，适合作为个人和小型团队的文档、知识和笔记管理工具。致力于成为优秀的私有化在线文档部署方案。

站点预览：[https://www.siques.cn/](https://www.siques.cn/)

## ㊙️功能特性

**站点管理**

- 用户注册、用户登录

**个人管理**

- 文集管理：新建、逻辑删除、物理删除
- 文档管理：新建、删除、托拽排序、上下级新建、文档转移、回收站、历史版本
- 图片管理：粘贴上传、托拽上传、删除

**文档书写**

- 富文本编辑模式，支持侧边 Toc。
- 图片、附件、科学公式、音视频、思维导图、流程图、Echart 图表；
- 文档排序、文档上级设置、文档模板插入；

**文档阅读**

- 两栏式布局，三级目录层级显示，左侧文集大纲，右侧文档正文级 Toc，支持段落跟踪。
- 文档阅读字体缩放、字体类型切换、页面社交分享、移动端阅读优化；
- 文集 EPUB、PDF 文件下载，文档 Markdown 文件下载；
- 文档全文搜索；

## 初始化

执行项目目录下的 sql 语句

```bash
src/main/resources/nest.sql
```

项目的储存需要大 🔥 自己配置一下，包括`elasticsearch`、`oss`、`datasource`、`redis`

```yml
spring:
  elasticsearch:
    rest:
      uris: 139.198.189.114:9200
      username: elastic
      password: heshenghao
  oss:
    endpoint: http://oss-accelerate.aliyuncs.com
    urlPre: https://shuxie.oss-accelerate.aliyuncs.com/
    bucketName: shuxie
    accessKeyId: LTAI4GDTDQm93qwQFzu9nz8a
    accessKeySecret: IoTPd2UEd7Sx9i1USc1cfrT44C1VZQ
  application:
    name: siques-backend
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: l1itdhjaoiqw32kwqe$5asasd*a21
    url: jdbc:mysql://127.0.0.1:3306/nest?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai
    type: com.zaxxer.hikari.HikariDataSource
  redis:
    host: 139.198.176.14
    port: 6379
    database: 4
    expiration: 1800
    password: heshenghao
```

## 项目启动

```bash
cd nuxt-web
npm run dev
```

后端`java`直接启动即可
