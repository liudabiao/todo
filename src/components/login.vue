<template>
  <div class="login">
    <message ref="msg" type="warn" text="这是一条测试信息"></message>
    <forget></forget>
    <div class="info-wrapper">
      <div class="sign-wrapper">
        <div :class="[status?'sign-in isChecked':'sign-in']" @click="userCheck('in')">SIGN IN</div>
        <div :class="[!status?'sign-up isChecked':'sign-up']" @click="userCheck('up')">SIGN UP</div>
      </div>
      <div class="form-wrapper">
        <div v-if="status" class="form-in">
          <div class="username">
            <div class="text">USERNAME</div>
            <div class="content"><input v-model="signin.username" type="text" class="input"/></div>
          </div>
          <div class="password">
            <div class="text">PASSWORD</div>
            <div class="content"><input @keyup.enter="signIn" v-model="signin.password" type="password" class="input"/>
            </div>
          </div>
          <div class="operat-wrapper">
            <div class="left">
              <div class="check">
                <input ref="remember" type="checkbox"/>
              </div>
              <div class="text">Keep me signed in</div>
            </div>
            <div class="right">
              Forgot password?
            </div>
          </div>
          <div class="btn-wrapper">
            <button class="btn-in" @click="signIn">SIGN IN</button>
          </div>
        </div>
        <div v-else-if="!status" class="form-up">
          <ul>
            <li>
              <div class="item">
                <div class="text">NICKNAME</div>
                <div class="input"><input placeholder="enter a nickname of 2 to 6 digits"
                                          @focus="infoAlertText='';infoAlert=false" @blur="checkNickname"
                                          v-model="signup.nickname"/></div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="text">USERNAME</div>
                <div class="input"><input placeholder="enter a username of 6 to 12 digits"
                                          @focus="infoAlertText='';infoAlert=false" @blur="checkUsername"
                                          v-model="signup.username"/></div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="text">PASSWORD</div>
                <div class="input"><input placeholder="enter a password of 6 to 12 digits"
                                          @focus="infoAlertText='';infoAlert=false" v-model="signup.password"
                                          type="password"/></div>
              </div>
            </li>
            <li>
              <div class="item">
                <div class="text">REP. PASSWORD</div>
                <div class="input"><input placeholder="repeat your password" @focus="infoAlertText='';infoAlert=false"
                                          @keyup.enter="signUp" @blur="checkPassword" v-model="signup.reppassword"
                                          type="password"/></div>
              </div>
            </li>
            <li>
              <transition name="signup-alert">
                <div v-if="infoAlert" class="alert">{{infoAlertText}}</div>
              </transition>
            </li>
          </ul>
          <div class="btn-wrapper">
            <button class="btn-in" @click="signUp">SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {doNotMatch} from "../util/mmfilter";
  import message from './message/message';
  import forget from './password/forget';

  export default {
    data() {
      return {
        status: true,
        password: '',
        infoAlert: false,
        infoAlertText: '',
        signup: {
          nickname: '',
          username: '',
          password: '',
          reppassword: ''
        },
        signin: {
          username: '',
          password: ''
        },
        roles: {
          username: {
            min: 6,
            max: 12,
            role: 'a-zA-Z0-9'
          },
          password: {
            min: 6,
            max: 12,
            role: 'a-zA-Z0-9'
          },
          nickname: {
            min: 6,
            max: 12
          }
        }
      };
    },
    mounted() {
      if(this.$storage.getStorage('rememberme')) {
        const tempInfo = this.$storage.getStorage('rememberme');
        this.signin.username = tempInfo.username;
        this.signin.password = tempInfo.password;
        this.$refs.remember.checked = true;
      }
    },
    methods: {
      userCheck(index = 'in') {
        if (index === 'in') {
          if (!this.status) {
            this.status = !this.status;
          }
        } else {
          if (this.status) {
            this.status = !this.status;
          }
        }
      },
      signIn() {
        for (let key in this.signin) {
          if (this.signin[key] === '') {
            return;
          }
        }
        this.signin.password = doNotMatch(this.signin.password);
        this.$http.post("/users/login", this.signin).then((res) => {
          if (res.data.status === '0') {
            const loginInfo = {
              username: res.data.result[0].username,
              nickname: res.data.result[0].nickname
            };
            if (this.$refs.remember.checked) {
              this.$storage.setStorage('rememberme', this.signin);
            }
            this.$store.commit('updateUserInfo', loginInfo);
          } else {
            this.$refs.msg.self();
          }
        })
      },
      checkNickname() {
        this.$http.get("/users/nickname", {params: {nickname: this.signup.nickname}}).then((res) => {
          if (res.data.status === '0' && res.data.result.length) {
            this.infoAlert = true;
            this.infoAlertText = 'The nickname already exists, try another one';
          } else if (res.data.status === '1') {
            this.infoAlert = true;
            this.infoAlertText = 'timeout, refresh the page';
          }
        })
      },
      checkUsername() {
        this.$http.get("/users/username", {params: {username: this.signup.username}}).then((res) => {
          if (res.data.status === '0' && res.data.result.length > 0) {
            this.infoAlert = true;
            this.infoAlertText = 'The username already exists, try another one';
          } else if (res.data.status === '1') {
            this.infoAlert = true;
            this.infoAlertText = 'timeout, refresh the page';
          }
        })
      },
      checkPassword() {
        if (this.signup.password !== this.signup.reppassword) {
          this.infoAlert = true;
          this.infoAlertText = 'The two passwords do not match, try again';
        }
      },
      signUp() {
        if (this.signup.password !== this.signup.reppassword) {
          this.infoAlert = true;
          this.infoAlertText = 'The two passwords do not match, try again';
        }
        for (let key in this.signup) {
          if (this.signup[key] === '') {
            this.infoAlert = true;
            this.infoAlertText = 'you have some options not filld in';
            return;
          }
        }
        this.signup.password = doNotMatch(this.signup.password);
        this.$http.post('/users/signup', this.signup).then((res) => {
          if (res.data.status === '0') {
            this.signin.username = this.signup.username;
            this.signin.password = this.signup.password;
            this.signIn();
          }
        })
      },
      role(key, obj) {
        const value = obj[key];
        const target = this.roles[key];
        if (target.min) {
          if (value.length < target.min) {
            return false;
          }
        }
        if (target.max) {
          if (value.length > target.max) {
            return false;
          }
        }
        if (target.role) {
          let res = value;
          if (target.role.indexOf('a-z') >= 0) {
            res = res.replace(/[a-z]/, '');
          }
          if (target.role.indexOf('A-Z') >= 0) {
            res = res.replace(/[A-Z]/, '');
          }
          if (target.role.indexOf('0-9') >= 0) {
            res = res.replace(/[0-9]/, '');
          }
          if (res.length > 0) {
            return false;
          }
        }
        return true;
      }
    },
    components: {
      message,
      forget
    }
  };
</script>

<style lang="sass">
  .login
    padding: 0
    margin: 0
    .info-wrapper
      position: absolute
      top: 20%
      left: 50%
      width: 800px
      height: 450px
      margin-left: -400px
      background-image: url('../../static/login_bg2.jpg')
      background-position: center center
      background-repeat: no-repeat
      background-size: cover
      border-radius: 10px
      box-shadow: 0px 0px 80px #333333
      .sign-wrapper
        position: absolute
        display: flex
        top: 30px
        left: 50%
        height: 36px
        line-height: 36px
        font-size: 24px
        margin-left: -130px
        width: 260px
        color: rgb(245, 245, 245)
        .sign-in, .sign-up
          flex: 1
          text-align: center
          cursor: pointer
          margin-right: 30px
        .isChecked
          border-bottom: 2px solid rgb(246, 51, 101)
      .form-wrapper
        position: absolute
        top: 120px
        left: 50%
        width: 600px
        margin-left: -300px
        .form-in
          .username
            .text
              padding-left: 15px
              padding-bottom: 5px
              text-align: left
              color: rgb(245, 245, 245)
              font-size: 12px
              line-height: 24px
              font-weight: 200
            .input
              width: 600px
              border: 0
              border-radius: 15px
              background: rgba(245, 245, 245, 0.6)
              height: 36px
              line-height: 36px
              font-size: 18px
              padding-left: 15px
              color: rgb(105, 105, 105)
              margin-bottom: 30px
              outline: none
          .password
            .text
              padding-left: 15px
              padding-bottom: 5px
              text-align: left
              color: rgb(245, 245, 245)
              font-size: 12px
              line-height: 24px
              font-weight: 200
            .input
              width: 600px
              border: 0
              border-radius: 15px
              background: rgba(245, 245, 245, 0.6)
              height: 36px
              line-height: 36px
              font-size: 18px
              padding-left: 15px
              color: rgb(105, 105, 105)
              margin-bottom: 20px
              outline: none
          .operat-wrapper
            position: absolute
            left: 0
            top: 190px
            width: 600px
            display: flex
            .left
              flex: 0 0 180px
              display: flex
              width: 180px
              .check
                flex: 0 0 5px
              .text
                flex: 1
                color: rgb(245, 245, 245)
                font-weight: 200
                font-size: 14px
                margin-left: -30px
            .right
              flex: 1
              text-align: right
              color: rgb(245, 245, 245)
              font-weight: 200
              font-size: 14px
              cursor: pointer
        .btn-wrapper
          position: absolute
          bottom: -100px
          left: 50%
          width: 600px
          margin-left: -300px
          .btn-in
            width: 600px
            border-radius: 15px
            height: 36px
            line-height: 36px
            background: rgb(246, 51, 101)
            border: 0
            color: rgb(245, 245, 245)
            font-size: 18px
            font-weight: 200
            outline: none
            cursor: pointer
      .form-up
        margin-top: -35px
        margin-left: -30px
        ul
          li
            list-style-type: none
            .item
              width: 600px
              .text
                width: 200px
                float: left
                line-height: 24px
                padding-bottom: 5px
                text-align: left
                color: rgb(245, 245, 245)
                font-size: 18px
                line-height: 24px
                font-weight: 200
              .input
                input
                  width: 380px
                  float: left
                  border: 0
                  border-radius: 15px
                  background: rgba(245, 245, 245, 0.6)
                  height: 24px
                  line-height: 24px
                  font-size: 18px
                  padding-left: 15px
                  color: rgb(105, 105, 105)
                  margin-bottom: 20px
                  outline: none
            .alert
              width: 600px
              height: 36px
              line-height: 36px
              text-align: left
              color: rgb(246, 51, 101)
              font-size: 18px
              font-weight: 700
              &.signup-alert-enter-active, &.signup-alert-leave-active
                transition: all .5s ease
              &.signup-alert-enter, &.signup-alert-leave-active
                opacity: 0
</style>
