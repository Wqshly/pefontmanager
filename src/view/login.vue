<template>
  <div>
      <vue-particles class="login-background"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    <div class="container">
      <div class="form-container">
        <div class="title-style">
          <p>管&nbsp;&nbsp;理&nbsp;&nbsp;员&nbsp;&nbsp;登&nbsp;&nbsp;录</p>
        </div>
        <el-form :model="loginForm" ref="loginForm">
          <el-form-item prop="usernumber">
            <el-input v-model="loginForm.usernumber" placeholder="请输入学号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;" @click="login('loginForm')" :disabled="loginDisable">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        schoolId: null,
        usernumber: null,
        password: null
      },
      loginFormRules: [],
      loginDisable: false
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.loginDisable) {
            this.loginDisable = true
            let url = '/login/loginManager'
            this.$api.http.post(url, this.loginForm)
              .then(res => {
                console.log(res.data)
                this.loginDisable = false
                var session = JSON.stringify(res.data)
                sessionStorage.setItem('userInfo', session)
                this.$router.push('/home')
              })
              .catch(err => {
                this.loginDisable = false
                console.log(err)
              })
          }
        }
      })
    },
    // 回车登录
    keyDown (e) {
      if (e.keyCode === 13) {
        this.login('loginForm')
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.keyDown)
  },
  destroyed () {
    window.removeEventListener('keydown', this.keyDown, false)
  }
}
</script>

<style scoped>

  .login-background {
    position: absolute;
    height: 100%;
    width: 100%;
    background: url(../assets/img/login-pic.jpg) no-repeat;
    background-size:100% 100%;;
  }

  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
  }

  .form-container {
    background-color: white;
    padding: 0 20px;
    border-radius: 10px;
    height: fit-content;
    width: 500px;
  }

  #particles {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #dcdfe6;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .form-row {
    padding: 10px 0;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .title-style {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    padding: 25px 0;
  }

  @media screen and (max-width: 351px) {
    .form-container {
      width: 100%;
    }
  }
</style>
