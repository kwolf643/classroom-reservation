<template>
    <section>
        <!--工具条-->
        <el-form ref="form" :model="form" @submit.prevent="onSubmit" style="margin:10px;">
            <el-form :inline="true" :model="filters" class="demo-form-inline">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 12px;">
                        <el-form-item label="教室名称">
                            <el-input v-model="filters.classroomId" placeholder="教室名称" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12">
                        <el-form-item label-width="80px" label="预约日期" class="postInfo-container-item">
                            <el-date-picker
                                    v-model="filters.date"
                                    type="date"
                                    :picker-options="pickerOptions1"
                                    placeholder="选择时间范围"
                                    align="right">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" style="margin-left: 12px;">
                        <el-form-item>
                            <el-button type="primary" v-on:click="getMaintains" icon="search">查询</el-button>
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
                    <el-button type="primary" @click="handleAdd" icon="plus" size="small">申请</el-button>
                </div>
            </div>
            <div class="panel-body">
                <!--列表-->
                <el-table :data="maintains" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                    <el-table-column type="index" width="60">
                    </el-table-column>
                    <el-table-column prop="classroomId"  label="教室名称"> </el-table-column>
                    <el-table-column prop="openStatus"   label="开放状态"> </el-table-column>
                    <el-table-column prop="addr"         label="教室地址"> </el-table-column>
                    <el-table-column prop="date"         label="预约日期"> </el-table-column>
                    <el-table-column prop="time1"        label="1-2节">    </el-table-column>
                    <el-table-column prop="time2"        label="3-4节">    </el-table-column>
                    <el-table-column prop="time3"        label="5-6节">    </el-table-column> 
                    <el-table-column prop="time4"        label="7-8节">    </el-table-column>
                    <el-table-column prop="time5"        label="9-10节">   </el-table-column>
                    <el-table-column prop="time6"        label="11-12节">  </el-table-column>
                </el-table>

                 <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.curPage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" class="fr">
                    </el-pagination>
                </el-col>
            </div>
        </div>

        <!--预约界面-->
        <el-dialog title="预约申请" v-model="addFormVisible" :close-on-click-modal="false" size="small">
            <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                <!--<el-row :gutter="2">-->
                <!--<el-col :xs="8" :sm="6" :md="5" :lg="5">-->
                <el-form-item label="教室名称" prop="classroomId" style="width: 450px;">
                    <el-input v-model="addForm.classroomId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预约日期" prop="rDate" style="width: 450px;">
                    <el-date-picker  align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                    </el-date-picker>
                 </el-form-item>
                 <!--</el-col>-->
                 <!--</el-row>-->
                 <el-form-item label="预约时间段" prop="rTime" style="width: 450px;">
                    <el-dropdown style="margin-left: 5px;">
						<span class="el-dropdown-link">
							时间段<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>1-2节</el-dropdown-item>
							<el-dropdown-item>3-4节</el-dropdown-item>
							<el-dropdown-item>5-6节</el-dropdown-item>
							<el-dropdown-item>7-8节</el-dropdown-item>
                            <el-dropdown-item>9-10节</el-dropdown-item>
							<el-dropdown-item divided>11-12</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
                </el-form-item>
                <el-form-item label="预约申请人" prop="userId" style="width: 450px;">
                    <el-input v-model="addForm.userId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="rPhone" style="width: 450px;">
                    <el-input v-model="addForm.rPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预约类型" prop="rType" style="width: 450px;">
                    <el-input v-model="addForm.rType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks" style="width: 450px;">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="addForm.remarks">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getMaintainListPage, removeMaintain, batchRemoveMaintain, editMaintain, addMaintain } from '../../api/api';

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
                    classroomId: '',
                    openStatus: '',
                    addr:'',
                    date:'',
                    time1:'',
                    time2:'',
                    time3:'',
                    time4:'',
                    time5:'',
                    time6:''
                },
                panelTitle: '查询列表',
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                maintains: [],
                total: 0,
                listLoading: false,
                sels: [],//列表选中列

                form: {
                    classroomId: '',
                    openStatus: '',
                    addr:'',
                    date:'',
                    time1:'',
                    time2:'',
                    time3:'',
                    time4:'',
                    time5:'',
                    time6:''
                },

                listQuery: {
                    curPage: 1,
                    limit: 20,
                    pageSize: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },

                addFormVisible: false,//预约界面是否显示
                addLoading: false,
                addFormRules: {
                    classroomId: [
                        { required: true, message: '请输入教室名称', trigger: 'blur' }
                    ],
                    rDate: [
                        { required: true, message: '请选择日期', trigger: 'blur' }
                    ],
                    rTime: [
                        { required: true, message: '请选择时间段', trigger: 'blur' }
                    ],
                    rType: [
                        { required: true, message: '请选择类型', trigger: 'blur' }
                    ],
                    rPhone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    remarks: [
                        { required: true, message: '请输入备注', trigger: 'blur' }
                    ],
                },
                //预约界面数据
                addForm: {
                    userId:'',
                    classroomId:'',
                    rDate:'',
                    rTime:'',
                    rType:'',
                    rPhone:'',
                    remarks:''
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
                this.getMaintains();
            },
            handleCurrentChange(val) {
                this.listQuery.curPage = val;
                this.getMaintains();
            },
            //刷新
            on_refresh(){
                this.getMaintains();
            },
            //获取查询列表
            getMaintains() {
                this.listLoading = true;
                //NProgress.start();
                 var para = {
                    curPage: this.listQuery.curPage,
                    pageSize: this.listQuery.pageSize,
                    classroomId: this.filters.classroomId,
                    date: this.filters.date
                };
                console.log(para);
                getMaintainListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.maintains = res.data.data;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
           
            //显示预约界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    strTitle: '',
                    strContent: ''
                };
            },
            //预约
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            addMaintain(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getMaintains();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            }
        },
        mounted() {
            this.getMaintains();
        }
    }

</script>

<style scoped>

</style>