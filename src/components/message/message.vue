<template>
  <transition name="msg">
    <div v-show="show" class="message">
      <div :class="[type]">
        {{text}}
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "message",
    props: {
      type: {
        type: String
      },
      text: {
        type: String
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      self() {
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 3000)
      }
    }
  }
</script>

<style lang="sass">
  .message
    z-index: 1000
    .normal, .warn, .success, .alert, .info
      z-index: 1000
      position: absolute
      top: 30px
      left: 50%
      height: 40px
      width: 300px
      margin-left: -150px
      border-radius: 8px
      box-shadow: 0 2px 10px #5A5E66
      text-align: center
      font-size: 18px
      line-height: 40px
      color: rgb(245, 245, 245)
    .normal
      background-color: #409EFF
    .warn
      background-color: rgb(246, 51, 101)
    .success
      background-color: #67C23A
    .alert
      background-color: #EB9E05
    .info
      background-color: #878D99
    &.msg-enter-active, &.msg-leave-active
      transition: all .5s ease
    &.msg-enter, &.msg-leave-active
      opacity: 0
</style>
