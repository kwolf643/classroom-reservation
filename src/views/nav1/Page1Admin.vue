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
                    <el-form-item label="开放状态">
                    <el-select v-model="filters.openStatus" placeholder="选择状态">
                        <el-option label="全部" value=3></el-option>
                        <el-option label="开放预约" value=1></el-option>
                        <el-option label="已锁定" value=0></el-option>
                     </el-select>
                </el-form-item>
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
                </div>
            </div>
            <div class="panel-body">
                <!--列表-->
                <el-table :data="maintains" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                    <el-table-column type="index" width="60">
                    </el-table-column>
                    <el-table-column prop="classroomId"  label="教室名称" sortable> </el-table-column>
                    <el-table-column prop="openStatus1"   label="开放状态" sortable>
                        <template scope="scope" >
                            <p v-if="scope.row.openStatus1=='已锁定'"  style="color:red;">已锁定</p>
                            <p v-if="scope.row.openStatus1=='开放预约'"  style="color:green;">开放预约</p>
                        </template> 
                    </el-table-column>
                    <el-table-column prop="date"         label="预约日期" sortable> </el-table-column>
                    <el-table-column prop="addr"         label="教室地址"> </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope" >
                            <el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">管理</el-button>
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

        <!--资源管理界面-->
        <el-dialog title="资源管理" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="教室名称" prop="classroomId" style="width: 292px;">
                    <el-input v-model="editForm.classroomId" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="起始日期" prop="firstDate">
                    <el-date-picker
                            v-model="editForm.firstDate"
                            type="date"
                            placeholder="选择日期"
                            align="right"
                            :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="secondtDate">
                    <el-date-picker
                            v-model="editForm.secondtDate"
                            type="date"
                            placeholder="选择日期"
                            align="right"
                            :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="操作" prop="openStatus">
                    <el-select v-model="editForm.openStatus" placeholder="选择时间段">
                        <el-option label="锁定" value=0></el-option>
                        <el-option label="开放" value=1></el-option>
                     </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>


    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getMaintainListPage, updateClassroom } from '../../api/api';

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
                    classroomId: '',
                    openStatus: null,
                    addr:'',
                    date:'',
                    time1:'',
                    time2:'',
                    time3:'',
                    time4:'',
                    time5:'',
                    time6:''
                },
                panelTitle: '教室列表',
                pickerOptions1: {
                    shortcuts: [{
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() );
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '后天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 6);
                            picker.$emit('pick', date);
                        }
                    }],
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                maintains: [],
                total: 0,
                listLoading: false,
                sels: [],//列表选中列

                form: {
                    classroomId: '',
                    openStatus: null,
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
                editFormVisible: false,//管理界面是否显示
                editLoading: false,
                editFormRules: {
                    firstDate: [
                        { required: true, type: 'date',message: '请选择日期', trigger: 'blur' }
                    ],
                    secondtDate: [
                        { required: true, type: 'date',message: '请选择日期', trigger: 'blur' }
                    ],
                    openStatus: [
                        { required: true, message: '请选择类型', trigger: 'blur' }
                    ]
                },
                //管理界面数据
                editForm: {
                    classroomId:'',
                    openStatus:'',
                    firstDate:'',
                    secondtDate:''
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
            //获取教室列表
            getMaintains() {
                this.listLoading = true;
                //NProgress.start();
                 var para;
                 if(this.filters.openStatus ==null){
                     para = {
                    curPage: this.listQuery.curPage,
                    pageSize: this.listQuery.pageSize,
                    classroomId: this.filters.classroomId,
                    date: this.filters.date,
                    openStatus:3
                    }
                 }
                else para = {
                    curPage: this.listQuery.curPage,
                    pageSize: this.listQuery.pageSize,
                    classroomId: this.filters.classroomId,
                    date: this.filters.date,
                    openStatus:this.filters.openStatus
                };
                console.log(para);
                getMaintainListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.maintains = res.data.data;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
              //管理操作
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                           var para = { classroomId:this.editForm.classroomId,
                                        openStatus: this.editForm.openStatus,
                                        firstDate: this.editForm.firstDate,
                                        secondtDate: this.editForm.secondtDate
                                     };
                            console.log(para);
                            updateClassroom(para).then((res) => {
                                this.editLoading  = false;
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
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getMaintains();
                                }
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