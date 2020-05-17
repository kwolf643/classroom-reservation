<template>
<div>
  <h1 class="page_title">高校教室预约管理系统</h1>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <a  v-on:click="forget" style="color:red;margin-left:180px;text-decoration:underline">忘记密码?</a>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button><br>
      <el-button type="primary" style="width:100%;margin-top:5px" @click.native.prevent="handleReset2">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import { requestLogin } from '../api/api';
  import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { type: 'string', min:12,max:12,pattern: '^[0-9]*$', message: '请输入12位账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min:4,max:16, message: '请输入4-16位密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    methods: {
      forget(){
        this.$confirm('请联系教务处老师 电话：****', '提示', {
                    type: 'warning'
                });
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            NProgress.start();
            var loginParams = { userId: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(login_data => {
              this.logining = false;
              NProgress.done();
              let { msg, code,data } = login_data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                this.$message({
                  message: msg,
                  type: 'success'
                });
                  sessionStorage.setItem('user', JSON.stringify(data));
                this.$router.push({ path: '/page1' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .page_title {
    margin: 80px auto 40px auto;
    text-align: center;
    color: #505458;
    font-style:normal;
    font-family:"Comic Sans MS", cursive, sans-serif;
    font-size:50px;
  }
</style>