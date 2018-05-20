<template>
  <transition name="fgt">
    <div v-show="show" class="forget">
      <div class="form-wrapper">
        <div class="title">RETRIEVE PASSWORD</div>
        <div class="info">
          <div class="text">USERNAME</div>
          <div class="input"><input v-model="username"/></div>
        </div>
        <div class="result">
          <div class="text">YOUR PASSWORD</div>
          <div class="text2">{{password}}</div>
        </div>
        <div class="btn-wrapper">
          <div @click="closeSelf" class="close">CLOSE</div>
          <div @click="retrieve" class="retrieve">RETRIEVE</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {doMatch} from '../../util/jjfilter'

  export default {
    name: "forget",
    data() {
      return {
        username: '',
        password: '',
        show: ''
      }
    },
    methods: {
      closeSelf() {
        this.password = '';
        this.show = false;
      },
      retrieve() {
        if (this.username === '') {
          return 0;
        }
        this.$http.get('/users/forget', {
          params: {
            username: this.username
          }
        }).then((res) => {
          this.password = doMatch(res.data.result[0].password);
          console.log(res.data.result[0].password);
          console.log(this.password);
        })
      }
    }
  }
</script>

<style lang="sass">
  .forget
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 10
    background-color: rgba(255, 255, 255, 0.1)
    .form-wrapper
      position: absolute
      top: 0
      left: 50%
      width: 600px
      height: 300px
      margin-left: -300px
      background: rgb(255, 255, 255)
      border-bottom-left-radius: 30px
      border-bottom-right-radius: 30px
      box-shadow: 0 2px 30px #5A5E66
      .title
        line-height: 80px
        font-size: 26px
      .info, .result
        padding: 20px
        display: flex
        .text
          line-height: 36px
          flex: 0 0 150px
          width: 150px
          text-align: right
          padding-right: 20px
        .text2
          height: 36px
          width: 300px
          border-radius: 15px
          line-height: 36px
          font-size: 18px
          border: 0
        .input
          input
            flex: 1
            height: 36px
            width: 300px
            border-radius: 15px
            line-height: 36px
            font-size: 18px
            padding-left: 15px
            border: 0
            outline: none
            background: rgba(245, 245, 245, 0.9)
      .btn-wrapper
        .close, .retrieve
          width: 295px
          height: 36px
          float: left
          line-height: 36px
          color: rgb(245, 245, 245)
          background: rgb(246, 51, 101)
          cursor: pointer
        .close
          margin-right: 5px
        .retrieve
          margin-left: 5px
    &.fgt-enter-active, &.fgt-leave-active
      transition: all .5s ease
    &.fgt-enter, &.fgt-leave-active
      opacity: 0
</style>
