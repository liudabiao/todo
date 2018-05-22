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
      <div class="search-wrapper">
        <div :class="[!inputType?'search':'search-focus']">
          <input @focus="longInput" @blur="shortInput" class="input" placeholder="搜索你需要的知识库..."/>
          <img src="../../static/search.png">
        </div>
      </div>
      <div class="personal">
        <ul>
          <li>
            <div class="img-wrapper">
              <span class="icon-bell"></span>
              <div class="point"></div>
            </div>
          </li>
          <li>
            <div class="img-wrapper">
              <span class="icon-bubble"></span>
              <div class="point"></div>
            </div>
          </li>
          <li><img class="user" src="../../static/user.png" width="36" height="36"/></li>
        </ul>
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
    name: "homepage",
    data() {
      return {
        inputType: false
      }
    },
    methods: {
      longInput() {
        this.inputType = true;
      },
      shortInput() {
        this.inputType = false;
      }
    }
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
        width: 250px
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
            &:hover
              color: rgb(100,100,100)
      .search-wrapper
        float: left
        width: 600px
        .search
          float: left
          border: 1px solid rgb(210, 210, 210)
          width: 300px
          height: 30px
          margin-left: 30px
          background: rgb(245, 245, 245)
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
        .search-focus
          float: left
          border: 1px solid rgb(150, 150, 150)
          width: 430px
          height: 30px
          margin-left: 30px
          background: rgb(255, 255, 255)
          border-radius: 6px
          margin-top: -3px
          padding-left: 10px
          input
            float: left
            border: 0
            width: 400px
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
      .personal
        ul
          li
            list-style: none
            float: left
            margin-right: 25px
            .img-wrapper
              position: relative
              width: 28px
              height: 28px
              span
                margin-top: 4px
                font-size: 24px
                color: rgb(180,180,180)
                cursor: pointer
                &:hover
                  color: rgb(100,100,100)
              .point
                position: absolute
                bottom: 0
                right: 0
                width: 10px
                height: 10px
                border-radius: 50%
                background: rgb(246, 51, 101)
                border: 2px solid rgb(255,255,255)
            .user
              margin-top: -3px
</style>
