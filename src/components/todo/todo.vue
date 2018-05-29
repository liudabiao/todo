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
      <div @click="getList('refresh')" class="refresh">
        <span class="icon icon-spinner11"></span>
        <span>刷新</span>
      </div>
      <div class="date">
        <span class="icon icon-calendar"></span>
        <div class="date-wrapper">
          <datepicker v-model="date" @selected="tick" format="yyyy-MM-dd" input-class="input-class"></datepicker>
        </div>
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
            <span @click="saveItem" class="icon-newspaper"></span>
            <div class="saveprompt">保存</div>
          </div>
          <div class="titleinput">
            <input v-model="title" placeholder="输入标题"/>
          </div>
          <div class="contentinput">
            <textarea v-model="content" rows="4" placeholder="你要做点什么..."></textarea>
          </div>
        </div>
      </transition>
      <div v-for="item in todo" class="item">
        <div v-if="!item.status" class="del">
          <span class="icon-cross"></span>
          <div class="delprompt">删除</div>
        </div>
        <div v-if="!item.status" class="complete">
          <span @click="completeItem(item._id)" class="icon-smile"></span>
          <div class="compprompt">完成</div>
        </div>
        <div :class="[item.status?'title title-cross':'title']">{{item.title}}</div>
        <div class="content">{{item.content}}</div>
      </div>
      <div class="loading"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="busy"
           infinite-scroll-distance="20">
        <img src="../../assets/circles.svg" v-show="loading">
      </div>
    </div>
  </div>
</template>

<script>
  import datepicker from 'vuejs-datepicker'

  export default {
    name: "todo",
    data() {
      return {
        compPrompt: false,
        delPrompt: false,
        showAdd: false,
        busy: true,
        page: 1,
        loading: false,
        title: '',
        content: '',
        todo: [],
        date: this.$format('yyyy-MM-dd'),
        index: 1
      }
    },
    components: {
      datepicker
    },
    mounted() {
      this.getList();
    },
    methods: {
      showAddItem() {
        this.showAdd = true;
      },
      hiddenAddPage() {
        this.showAdd = false;
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getList('infinite');
        }, 500);
      },
      tick() {
        this.$nextTick(() => {
          this.getList('');
        })
      },
      getList(flag) {
        const username = this.$store.state.loginStatus.username;
        if (flag === 'refresh' || flag === '') {
          this.page = 1;
        }
        const param = {
          page: this.page,
          username: username,
          date: this.$format('yyyy-MM-dd', this.date)
        };
        this.loading = true;
        this.$http.get('/todos/search', {params: param}).then((res) => {
          this.loading = false;
          if (res.data.status === '0') {
            if (flag === 'infinite') {
              this.todo = this.todo.concat(res.data.result);
              if (res.data.result.length === 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.todo = res.data.result;
              this.busy = false;
            }
          } else {
            this.todo = [];
          }
        })
      },
      saveItem() {
        var param = {
          date: this.$format('yyyy-MM-dd'),
          username: this.$store.state.loginStatus.username,
          title: this.title,
          content: this.content
        }
        this.$http.post('/todos/insert', param).then((res) => {
          if (res.data.status === '0') {
            this.todo = res.data.result;
            this.title = '';
            this.content = '';
            this.hiddenAddPage();
          }
        })
      },
      completeItem(id) {
        this.$http.post('/todos/update', {id: id}).then((res) => {
          if (res.data.status === '1') {
            console.log('err');
          } else {
            console.log('success');
          }
        })
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
      .add, .complete, .refresh, .date
        position: relative
        float: left
        margin-left: 25px
        margin-right: 40px
        color: rgb(100, 100, 100)
        cursor: pointer
        &:hover
          color: rgb(30, 144, 255)
        .icon
          color: rgb(180, 180, 180)
        .date-wrapper
          position: absolute
          top: 0
          left: 20px
          .input-class
            outline: none
            border: 0
            font-size: 16px
            background: transparent
            cursor: pointer
            color: transparent
            text-shadow: 0 0 0 rgb(100, 100, 100)
            &:hover
              text-shadow: 0 0 0 rgb(30, 144, 255)
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
    .loading
      position: relative
      float: left
      width: 100%
      margin-top: 15px
      img
        position: absolute
        left: 50%
        margin-left: -15px
</style>
