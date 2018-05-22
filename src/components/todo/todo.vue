<template>
  <div class="todo">
    <div class="tool">
      <div class="add" @click="showAddItem">
        <span class="icon icon-pencil"></span>
        <span>增加</span>
      </div>
      <div class="complete">
        <span class="icon icon-sphere"></span>
        <span>全部完成</span>
      </div>
      <div class="date">
        <span class="icon icon-calendar"></span>
        <span>日期</span>
      </div>
    </div>
    <div class="list">
      <transition name="adding">
        <div v-if="showAdd" class="add-item">
          <div class="close">
            <span class="icon-cross" @click="hiddenAddPage"></span>
            <div class="closeprompt">关闭</div>
          </div>
          <div class="save">
            <span class="icon-newspaper"></span>
            <div class="saveprompt">保存</div>
          </div>
          <div class="titleinput">
            <input placeholder="输入标题"/>
          </div>
          <div class="contentinput">
            <textarea rows="4" placeholder="你要做点什么..."></textarea>
          </div>
        </div>
      </transition>
      <div class="item">
        <div class="del">
          <span class="icon-cross"></span>
          <div class="delprompt">删除</div>
        </div>
        <div class="complete">
          <span class="icon-smile"></span>
          <div class="compprompt">完成</div>
        </div>
        <div class="title title-cross">TODO模块设计</div>
        <div class="content">这个模块的主要功能是TODO，有增加item，删除item，完成item，明细查看等功能这个模块的主要功能是TODO，有增加item，删除item，完成item，明细查看等功能
        </div>
      </div>
    </div>
    <div class="add-page">

    </div>
  </div>
</template>

<script>
  export default {
    name: "todo",
    data() {
      return {
        compPrompt: false,
        delPrompt: false,
        showAdd: false
      }
    },
    mounted() {
      this.$http.get('/').then((res) => {

      })
    },
    methods: {
      showAddItem() {
        this.showAdd = true;
      },
      hiddenAddPage() {
        this.showAdd = false;
      }
    }
  }
</script>

<style lang="sass">
  .todo
    margin: 0
    padding: 0
    .tool
      position: relative
      top: 0
      left: 0
      height: 60px
      width: 100%
      background: rgb(255, 255, 255)
      box-shadow: 0 1px 8px rgb(225, 225, 225)
      line-height: 60px
      border-radius: 5px
      margin-bottom: 10px
      .add, .complete, .date
        float: left
        margin-left: 25px
        margin-right: 40px
        color: rgb(100, 100, 100)
        cursor: pointer
        &:hover
          color: rgb(30, 144, 255)
        .icon
          color: rgb(180, 180, 180)
    .list
      position: relative
      width: 100%
      .add-item
        position: relative
        float: left
        border-radius: 5px
        background: rgb(255, 255, 255)
        box-shadow: 0 1px 8px rgb(225, 225, 225)
        width: 100%
        min-height: 100px
        margin-bottom: 10px
        &.adding-enter-active, &.adding-leave-active
          transition: all 0.7s ease
          &.adding-enter, &.adding-leave-active
            opacity: 0
        .close
          position: absolute
          top: 15px
          right: 15px
          font-size: 14px
          color: rgb(180, 180, 180)
          cursor: pointer
          .closeprompt
            position: absolute
            display: none
            top: 30px
            right: 1px
            background: rgba(50, 50, 50, 0.2)
            font-size: 12px
            width: 40px
            height: 20px
            text-align: center
            line-height: 20px
            color: rgb(180, 180, 180)
            border-radius: 5px
          &:hover
            color: rgb(100, 100, 100)
          &:hover .closeprompt
            display: block
        .save
          position: absolute
          top: 14px
          right: 45px
          font-size: 16px
          color: rgb(180, 180, 180)
          cursor: pointer
          .saveprompt
            position: absolute
            display: none
            top: 30px
            right: 1px
            background: rgba(50, 50, 50, 0.2)
            font-size: 12px
            width: 40px
            height: 20px
            text-align: center
            line-height: 20px
            color: rgb(180, 180, 180)
            border-radius: 5px
          &:hover
            color: rgb(100, 100, 100)
          &:hover .saveprompt
            display: block
        .titleinput
          input
            margin: 15px 0 15px 25px
            font-size: 20px
            color: rgb(100, 100, 100)
            width: 300px
            height: 40px
            line-height: 40px
            outline: none
            border-radius: 13px
            padding-left: 15px
            border: 0
            background: rgb(245, 245, 245)
        .contentinput
          textarea
            left: 0
            top: 0
            position: relative
            width: 85%
            min-height: 40px
            color: rgb(120, 120, 120)
            line-height: 20px
            margin: 0 15px 15px 25px
            outline: none
            border: 0
            background: rgb(245, 245, 245)
            border-radius: 13px
            padding: 5px 15px
      .item
        position: relative
        float: left
        border-radius: 5px
        background: rgb(255, 255, 255)
        box-shadow: 0 1px 8px rgb(225, 225, 225)
        width: 100%
        min-height: 100px
        margin-bottom: 10px
        .del
          position: absolute
          top: 15px
          right: 15px
          font-size: 14px
          color: rgb(180, 180, 180)
          cursor: pointer
          .delprompt
            position: absolute
            display: none
            top: 30px
            right: 1px
            background: rgba(50, 50, 50, 0.2)
            font-size: 12px
            width: 40px
            height: 20px
            text-align: center
            line-height: 20px
            color: rgb(180, 180, 180)
            border-radius: 5px
          &:hover
            color: rgb(100, 100, 100)
          &:hover .delprompt
            display: block
        .complete
          position: absolute
          top: 14px
          right: 45px
          font-size: 16px
          color: rgb(180, 180, 180)
          cursor: pointer
          .compprompt
            position: absolute
            display: none
            top: 30px
            right: 1px
            background: rgba(50, 50, 50, 0.2)
            font-size: 12px
            width: 40px
            height: 20px
            text-align: center
            line-height: 20px
            color: rgb(180, 180, 180)
            border-radius: 5px
          &:hover
            color: rgb(100, 100, 100)
          &:hover .compprompt
            display: block
        .title
          margin: 15px 0 15px 25px
          font-size: 20px
          color: rgb(100, 100, 100)
        .title-cross
          text-decoration: line-through
        .content
          left: 0
          top: 0
          position: relative
          width: 85%
          min-height: 40px
          color: rgb(120, 120, 120)
          line-height: 20px
          margin: 0 15px 15px 25px
</style>
