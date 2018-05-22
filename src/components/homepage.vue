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
    <div class="tools">
      <div class="tool">
        <ul>
          <li>
            <div class="item">
              <span class="icon icon-color-1 icon-book"></span>
              <span class="text">书炉</span>
            </div>
          </li>
          <li>
            <div class="item">
              <span class="icon icon-color-2 icon-tv"></span>
              <span class="text">话题</span>
            </div>
          </li>
          <li>
            <div class="item">
              <span class="icon icon-color-3 icon-magic-wand"></span>
              <span class="text">咨询</span>
            </div>
          </li>
          <li>
            <div class="item">
              <span class="icon icon-color-4 icon-power"></span>
              <span class="text">充电</span>
            </div>
          </li>
          <li>
            <div class="item">
              <span class="icon icon-color-5 icon-fire"></span>
              <span class="text">生活</span>
            </div>
          </li>
          <li>
            <div class="item">
              <span class="icon icon-color-6 icon-pen"></span>
              <span class="text">日志</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="info">
        <ul>
          <li>刘大彪</li>
          <li>使用简介</li>
          <li>LIB相关技术栈</li>
          <li>我要参与</li>
          <li>意见投稿</li>
          <li>功能有待完善，敬请谅解</li>
        </ul>
      </div>
    </div>
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
      box-shadow: 0 2px 8px rgb(225, 225, 225)
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
              color: rgb(100, 100, 100)
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
                color: rgb(180, 180, 180)
                cursor: pointer
                &:hover
                  color: rgb(100, 100, 100)
              .point
                position: absolute
                bottom: 0
                right: 0
                width: 10px
                height: 10px
                border-radius: 50%
                background: rgb(246, 51, 101)
                border: 2px solid rgb(255, 255, 255)
            .user
              margin-top: -3px
    .tools
      position: relative
      .tool
        position: fixed
        top: 80px
        left: 190px
        width: 300px
        height: 200px
        background: rgb(255, 255, 255)
        border-radius: 5px
        box-shadow: 0 1px 8px rgb(225, 225, 225)
        ul
          list-style: none
          li
            float: left
            .item
              width: 40px
              height: 60px
              text-align: center
              margin-right: 45px
              margin-bottom: 20px
              .icon
                font-size: 24px
                line-height: 48px
              .text
                font-size: 14px
                color: rgb(180, 180, 180)
              .icon-color-1
                color: rgb(179, 238, 58)
              .icon-color-2
                color: rgb(30, 144, 255)
              .icon-color-3
                color: rgb(138, 43, 226)
              .icon-color-4
                color: rgb(2255, 215, 0)
              .icon-color-5
                color: rgb(246, 51, 101)
              .icon-color-6
                color: rgb(70, 130, 180)
      .info
        position: fixed
        top: 270px
        left: 155px
        width: 300px
        ul
          list-style: none
          counter-reset: count
          li
            font-size: 14px
            color: rgb(180, 180, 180)
            float: left
            margin-right: 10px
            cursor: pointer
            &:hover
              color: rgb(100, 100, 100)
            &:before
              content: '·  '
              color: rgb(180, 180, 180)
    .content
      position: absolute
      top: 80px
      left: 510px
      width: 665px

</style>
