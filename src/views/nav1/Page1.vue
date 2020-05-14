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
                            <el-button type="primary" v-on:click="getClassroom" icon="search">查询</el-button>
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
                    <el-table-column prop="classroomId"  label="教室名称" sortable> </el-table-column>
                    <el-table-column prop="openStatus1"   label="开放状态" sortable>
                        <template scope="scope" >
                            <p v-if="scope.row.openStatus1=='已锁定'"  style="color:red;">已锁定</p>
                            <p v-if="scope.row.openStatus1=='开放预约'"  style="color:green;">开放预约</p>
                        </template> 
                    </el-table-column>
                    <el-table-column prop="addr"         label="教室地址"> </el-table-column>
                    <el-table-column prop="date"         label="预约日期" sortable> </el-table-column>
                    <el-table-column prop="time1"        label="1-2节">
                        <template scope="scope" >
                            <el-button size="small" type="primary" icon="plus" v-if="scope.row.time1=='空闲'"  @click="handleAdd(scope.$index, scope.row,1)">空闲</el-button>
                            <p v-if="scope.row.time1=='已占'"  style="color:red;">已占</p>
                        </template> 
                    </el-table-column>
                    <el-table-column prop="time2"        label="3-4节">    
                        <template scope="scope" >
                            <el-button size="small" type="primary" icon="plus" v-if="scope.row.time2=='空闲'"  @click="handleAdd(scope.$index, scope.row,2)">空闲</el-button>
                            <p v-if="scope.row.time2=='已占'"  style="color:red;">已占</p>
                        </template> 
                    </el-table-column>
                    <el-table-column prop="time3"        label="5-6节">    
                        <template scope="scope" >
                            <el-button size="small" type="primary" icon="plus" v-if="scope.row.time3=='空闲'"  @click="handleAdd(scope.$index, scope.row,3)">空闲</el-button>
                            <p v-if="scope.row.time3=='已占'"  style="color:red;">已占</p>
                        </template> </el-table-column> 
                    <el-table-column prop="time4"        label="7-8节">    
                        <template scope="scope" >
                            <el-button size="small" type="primary" icon="plus" v-if="scope.row.time4=='空闲'"  @click="handleAdd(scope.$index, scope.row,4)">空闲</el-button>
                            <p v-if="scope.row.time4=='已占'"  style="color:red;">已占</p>
                        </template> 
                    </el-table-column>
                    <el-table-column prop="time5"        label="9-10节">   
                        <template scope="scope" >
                            <el-button size="small" type="primary" icon="plus" v-if="scope.row.time5=='空闲'"  @click="handleAdd(scope.$index, scope.row,5)">空闲</el-button>
                            <p v-if="scope.row.time5=='已占'"  style="color:red;">已占</p>
                        </template> 
                    </el-table-column>
                    <el-table-column prop="time6"        label="11-12节">  
                        <template scope="scope" >
                            <el-button size="small" type="primary" icon="plus" v-if="scope.row.time6=='空闲'"  @click="handleAdd(scope.$index, scope.row,6)">空闲</el-button>
                            <p v-if="scope.row.time6=='已占'"  style="color:red;">已占</p>
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

        <!--预约界面-->
        <el-dialog title="预约申请" v-model="addFormVisible" :close-on-click-modal="false" size="small">
            <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                <!--<el-row :gutter="2">-->
                <!--<el-col :xs="8" :sm="6" :md="5" :lg="5">-->
                <el-form-item label="教室名称" prop="cRId" style="width: 450px;">
                    <el-input v-model="addForm.cRId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预约日期" prop="rDate" style="width: 450px;">
                    <el-date-picker v-model="addForm.rDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                    </el-date-picker>
                 </el-form-item>
                 <!--</el-col>-->
                 <!--</el-row>-->
                 <el-form-item label="预约时间段" prop="rTime" style="width: 450px;">
                    <el-select v-model="addForm.rTime" placeholder="选择时间段">
                        <el-option label="1-2节" value=1></el-option>
                        <el-option label="3-4节" value=2></el-option>
                        <el-option label="5-6节" value=3></el-option>
                        <el-option label="7-8节" value=4></el-option>
                        <el-option label="9-10节" value=5></el-option>
                        <el-option label="11-12节" value=6></el-option>
                     </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="rPhone" style="width: 450px;">
                    <el-input v-model="addForm.rPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预约类型" prop="rType" style="width: 450px;">
                    <el-select v-model="addForm.rType"  placeholder="请选择类型">
                        <el-option label="会议" value="会议"></el-option>
                        <el-option label="社团活动" value="社团活动"></el-option>
                        <el-option label="班级预约" value="班级预约"></el-option>
                        <el-option label="课外辅导" value="课外辅导"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                     </el-select>
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
    import { getClassroomListPage, addReserve } from '../../api/api';

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
                panelTitle: '查询列表',
                pickerOptions1: {
                    shortcuts: [{
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '后天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24*2);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
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

                addFormVisible: false,//预约界面是否显示
                addLoading: false,
                addFormRules: {
                    cRId: [
                        { required: true, message: '请输入教室名称', trigger: 'blur' }
                    ],
                    rDate: [
                        { required: true, type: 'date',message: '请选择日期', trigger: 'blur' }
                    ],
                    rTime: [
                        { required: true, message: '请选择时间段', trigger: 'blur' }
                    ],
                    rType: [
                        { required: true, message: '请选择类型', trigger: 'blur' }
                    ],
                    rPhone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { type: 'string', min:11,max:11,pattern: '^[0-9]*$', message: '只能11位输入数字', trigger: 'blur' }
                    ],
                    remarks: [
                        { required: true, message: '请输入备注', trigger: 'blur' }
                    ]
                },
                //预约界面数据
                addForm: {
                    cRId:'',
                    rDate:'',
                    rTime:"",
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
                this.getClassroom();
            },
            handleCurrentChange(val) {
                this.listQuery.curPage = val;
                this.getClassroom();
            },
            //刷新
            on_refresh(){
                this.getClassroom();
            },
            //获取查询列表
            getClassroom() {
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
                getClassroomListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.maintains = res.data.data;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
           
            //显示预约界面
            handleAdd: function (index, row,time) {
                this.addFormVisible = true;
                this.addForm.cRId = row.classroomId;
                var date=new Date(row.date);
                this.addForm.rDate= date;
                this.addForm.rTime = time;
                
            },
            //预约
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            var para = { crid: this.addForm.cRId,rDate: this.addForm.rDate,rTime: this.addForm.rTime,
                                         rType:this.addForm.rType,rPhone: this.addForm.rPhone,remarks: this.addForm.remarks };
                            console.log(para);
                            addReserve(para).then((res) => {
                                this.addLoading = false;
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
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getClassroom();
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
          this.getClassroom();
        }
    }

</script>

<style scoped>

</style>