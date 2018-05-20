<template>
  <div class="homepage">
    <div class="header">
      <div class="title">LIB</div>
      <div class="map">
        <ul>
          <li>首页</li>
          <li>TODO</li>
          <li>知识</li>
        </ul>
      </div>
      <div class="search">
        <input class="text" placeholder="搜索你需要的知识库..."/>
        <img src="../../static/search.png">
      </div>
      <div class="personal">
        <div class="alert"><img/></div>
        <div class="info"><img/></div>
        <div class="img"><img/></div>
      </div>
    </div>
    <div class="tool"></div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "homepage"
  }
</script>

<style lang="sass">
  .homepage
    position: absolute
    margin: 0
    padding: 0
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgb(245, 245, 245)
    .header
      position: fixed
      width: 100%
      height: 60px
      background: rgb(255, 255, 255)
      box-shadow: 0 2px 15px rgb(190, 190, 190)
      .title
        float: left
        width: 300px
        text-align: right
        line-height: 60px
        font-size: 40px
        color: rgb(246, 51, 101)
        margin-right: 30px
      .map
        ul
          li
            margin-left: 15px
            list-style: none
            float: left
            font-size: 16px
            cursor: pointer
            color: rgb(180, 180, 180)
      .search
        float: left
        border: 1px solid rgb(210,210,210)
        width: 300px
        height: 30px
        margin-left: 30px
        background: rgb(245,245,245)
        border-radius: 6px
        margin-top: -3px
        padding-left: 10px
        input
          float: left
          border: 0
          width: 270px
          outline: none
          height: 26px
          line-height: 30px
          font-size: 14px
          background: transparent
        img
          float: left
          width: 20px
          height: 20px
          background-size: 20px 20px
          margin-top: 5px
          cursor: pointer
</style>
