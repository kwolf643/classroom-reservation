<template>
    <section>
        <!--工具条-->
        <el-form ref="form" :model="form" @submit.prevent="onSubmit" style="margin:10px;">
            <el-form :inline="true" :model="filters" class="demo-form-inline">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12">
                        <el-form-item label-width="80px" label="反馈日期" class="postInfo-container-item">
                            <el-date-picker
                                    v-model="filters.fDate"
                                    type="date"
                                    :picker-options="pickerOptions1"
                                    placeholder="选择时间范围"
                                    align="right">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" style="margin-left: 12px;">
                        <el-form-item>
                            <el-button type="primary" v-on:click="getFeedback" icon="search">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-form>

        <div class="panel">
            <div class="panel-title">
                <span v-text="panelTitle"></span>
                <div class="fr">
                    <el-button @click.stop="on_refresh" size="small">
                        <i class="fa fa-refresh"></i>
                    </el-button>
                </div>
            </div>
            <div class="panel-body">
                <!--列表-->
                <el-table :data="feedbacks" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                    <el-table-column type="index" width="60">
                    </el-table-column>
                    <el-table-column prop="fDate"  label="反馈日期" sortable> </el-table-column>
                    <el-table-column prop="username"         label="反馈人"> </el-table-column>
                    <el-table-column prop="identity"         label="反馈人身份"> </el-table-column>
                    <el-table-column prop="topic"         label="反馈主题"> </el-table-column>
                    <el-table-column prop="content"         label="反馈内容"> </el-table-column>
                    <el-table-column prop="fPhone"         label="联系方式"> </el-table-column>
                    <el-table-column prop="fStatus"   label="反馈状态" sortable>
                        <template scope="scope" >
                            <p v-if="scope.row.fStatus==0"  style="color:blue;">待查看</p>
                            <p v-if="scope.row.fStatus==1"  style="color:green;">已阅</p>
                        </template> 
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope" >
                            <el-button v-if="scope.row.fStatus ==0" type="success" size="small" @click="handleRead(scope.$index, scope.row)">已阅</el-button>
                            <el-button v-if="scope.row.fStatus ==1" type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                 <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.curPage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" class="fr">
                    </el-pagination>
                </el-col>
            </div>
        </div>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getFeedbackListPage, changeFeedback,deleteFeedbackAdmin } from '../../api/api';

    export default {
        data() {
            return {
                pageState:1,
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
                    content:'',
                    topic:'',
                    fPhone:'',
                    fDate:''
                },
                panelTitle: '反馈处理',
                pickerOptions1: {
                    shortcuts: [{
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24*2);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime());
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 6);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                feedbacks: [],
                total: 0,
                listLoading: false,
                sels: [],//列表选中列

                form: {
                    content:'',
                    topic:'',
                    fPhone:''
                },

                listQuery: {
                    curPage: 1,
                    limit: 20,
                    pageSize: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                }
            }
        },
        methods: {
            //状态显示转换
            formatState: function (row, column) {
                return row.state == 0 ? '未启用' : row.state == 1 ? '已启用' : '未知';
            },
            //操作分页
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getFeedback();
            },
            handleCurrentChange(val) {
                this.listQuery.curPage = val;
                this.getFeedback();
            },
            //刷新
            on_refresh(){
                this.getFeedback();
            },
            //获取反馈列表
            getFeedback() {
                this.listLoading = true;
                //NProgress.start();
                var para = {
                    curPage: this.listQuery.curPage,
                    pageSize: this.listQuery.pageSize,
                    fDate: this.filters.fDate
                }
                console.log(para);
                getFeedbackListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.feedbacks = res.data.data;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
             //已阅
            handleRead: function (index, row) {
                this.$confirm('确认已知晓反馈内容?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {feedbackId: row.feedbackId};
                    console.log(para);
                    changeFeedback(para).then((res) => {
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
                                })
                        }
                        this.getFeedback();
                    });
                }).catch(() => {

                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除反馈吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {feedbackId: row.feedbackId};
                    console.log(para);
                    deleteFeedbackAdmin(para).then((res) => {
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
                                })
                        }
                        this.getFeedback();
                    });
                }).catch(() => {

                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            }
        },
        mounted() {
          this.getFeedback();
        }
    }

</script>

<style scoped>

</style>