<template>
    <section>
        <el-form ref="form" :model="form" @submit.prevent="onSubmit" style="margin:10px;">
            <h3 style="color:green">修改个人信息:</h3>
            <el-form :inline="true" :model="filters" class="demo-form-inline" :rules="FormRules">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 30px;">
                        <el-form-item label="我的账号：" prop="userId">
                            <el-input disabled v-model="filters.userId" placeholder="账号" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 30px;">
                        <el-form-item label="我的姓名：" prop="username">
                            <el-input disabled v-model="filters.username" placeholder="姓名" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 30px;">
                        <el-form-item label="我的身份：" prop="identity">
                            <el-input disabled v-model="filters.identity" placeholder="身份" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 30px;">
                        <el-form-item label="电话号码：" prop="phone">
                            <el-input  v-model="filters.phone" placeholder="电话号码" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 30px;">
                        <el-form-item label="我的邮箱：" prop="email">
                            <el-input  v-model="filters.email" placeholder="邮箱" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" style="margin-left: 80px;">
                        <el-form-item>
                            <el-button type="success" v-on:click="refresh1" >重置</el-button>
                            <el-button type="primary" v-on:click="updateUserinfo" style="margin-left: 30px;" >提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-form>
        <div>
        <el-form ref="form" :model="form" @submit.prevent="onSubmit" style="margin:10px;">
            <h3 style="color:green">修改密码:</h3>
            <el-form :inline="true" :model="filters" class="demo-form-inline"  :rules="FormRules">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 30px;">
                        <el-form-item label="原密码：" prop="password">
                            <el-input type="password" v-model="filters.password" placeholder="请输入原密码" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 30px;">
                        <el-form-item label="新密码：" prop="newpassword">
                            <el-input type="password" v-model="filters.newpassword" placeholder="请输入新密码" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 30px;">
                        <el-form-item label="新密码：" prop="newpassword2">
                            <el-input type="password" v-model="filters.newpassword2" placeholder="请再次输入新密码" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" style="margin-left: 80px;">
                        <el-form-item>
                            <el-button type="success" v-on:click="refresh2" >重置</el-button>
                            <el-button type="primary" v-on:click="updatePassword" style="margin-left: 30px;" >提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-form>
        </div>
    </section>
</template>


<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { updatePsd,updateUser} from '../../api/api';

    export default {
        data() {
            return {
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1'// 按钮的背景颜色
                },
                filters: {
                    userId: '',
                    username:'',
                    password: '',
                    identity:'',
                    email:'',
                    phone:'',
                    newpassword:'',
                    newpassword2:'',
                },
                form: {
                    userId: '',
                    username:'',
                    password: '',
                    identity:'',
                    email:'',
                    phone:'',
                    newpassword:'',
                    newpassword2:'',
                },
                FormRules: {
                    email: [
                        {type:'email', required: true, message: '请输入邮箱', trigger: 'blur' }
                    ],
                    newpassword2: [
                        { required: true,message: '请再次输入新密码', trigger: 'blur' },
                        { min:4,max:16, message: '请输入4-16位密码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                         { min:4,max:16, message: '请输入4-16位密码', trigger: 'blur' }
                    ],
                    newpassword: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min:4,max:16, message: '请输入4-16位密码', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { type: 'string', min:11,max:11,pattern: '^[0-9]*$', message: '只能11位输入数字', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            logout: function () {
                var _this = this;
                this.$confirm('密码已修改，请退出重新登录', '提示', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },
            //重置
            refresh1(){
                this.getUserInfo();
            },
            refresh2(){
                this.filters.password="";
                this.filters.newpassword="";
                this.filters.newpassword2="";
            },
            //得到个人信息
            getUserInfo(){
                var user = sessionStorage.getItem('user');
                user = JSON.parse(user);
                this.filters.userId=user.userId;
                this.filters.username=user.username;
                this.filters.email=user.email;
                this.filters.phone=user.phone;
                if(user.identity==1){
				this.identity=1;
				this.filters.identity = "管理员";}
				if(user.identity==2){
				this.filters.identity = "老师";}
				if(user.identity==3){
                this.filters.identity = "同学";}
            },
            //修改个人信息
            updateUserinfo(){
                 this.$confirm('确认修改个人信息吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    //NProgress.start();
                    let para = {phone: this.filters.phone,email: this.filters.email};
                    console.log(para);
                    updateUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        if (res.data.code !== 200) {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                             });
                        } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                sessionStorage.setItem('user', JSON.stringify(res.data.data));
                        }
                        this.getUserInfo();
                    });
                }).catch(() => {

                });
            },
            //修改密码
            updatePassword(){
                if(this.filters.newpassword!=this.filters.newpassword2){
                    this.$message({
                                    message: "两次输入的密码不一样",
                                    type: 'error'
                             });
                }
                else if (this.filters.password==this.filters.newpassword){
                     this.$message({
                                    message: "新密码和旧密码一样！",
                                    type: 'error'
                             });
                }
                else {
                this.$confirm('确认修改密码吗? 你的新密码为：'+this.filters.newpassword, '提示', {
                    type: 'warning'
                }).then(() => {
                    //NProgress.start();
                    let para = {password: this.filters.password,newpassword: this.filters.newpassword};
                    console.log(para);
                    updatePsd(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        if (res.data.code !== 200) {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                             });
                        } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                
                        }
                    });
                    this.getUserInfo();
                }).catch(() => {

                });
                }
            },
        },
        mounted() {
            this.getUserInfo();
        }
    }
</script>

<style scoped>

</style>