<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="login" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model.number="login.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-zt-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="login.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-zt-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { login } from '../network/user';

  export default {
    data: function() {
      return {
        login: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.login.validate(valid => {
          if (valid) {
            login({username:this.login.username,password:this.login.password})
              .then(res => {
                if (res['code'] === 600) {
                  this.$message.error('帐号或密码错误！');
                } else {
                  this.$message.success('登录成功！');
                  localStorage.setItem('nickName', "钟志刚");
                  localStorage.setItem('sj_bops_token',"123");
                  this.$router.replace('/home');
                }
              }).catch(async err => {
              await this.$message.error("登录失败");
              await this.$message.error(err.message);
              console.log(err);
            });


          } else {
            this.$message.error('请输入账号和密码');
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
  }

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
</style>
