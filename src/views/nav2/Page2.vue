<template>
    <section>
        <!--工具条-->
        <el-form ref="form" :model="form" @submit.prevent="onSubmit" style="margin:10px;">
            <el-form :inline="true" :model="filters" class="demo-form-inline">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-left: 12px;">
                        <el-form-item label="教室名称">
                            <el-input v-model="filters.cRId" placeholder="教室名称" style="width: 160px;"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :xs="10" :sm="10" :md="10" :lg="10" >
                <el-form-item label="预约状态">
                    <el-select v-model="filters.rStatus" placeholder="选择状态">
                        <el-option label="全部" value=0></el-option>
                        <el-option label="审核中" value=1></el-option>
                        <el-option label="预约成功" value=2></el-option>
                        <el-option label="未通过" value=3></el-option>
                        <el-option label="已撤回" value=4></el-option>
                     </el-select>
                </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12">
                        <el-form-item label-width="80px" label="预约日期" class="postInfo-container-item">
                            <el-date-picker
                                    v-model="filters.rDate"
                                    type="date"
                                    :picker-options="pickerOptions1"
                                    placeholder="选择时间范围"
                                    align="right">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" style="margin-left: 12px;">
                        <el-form-item>
                            <el-button type="primary" v-on:click="getReservation" icon="search">查询</el-button>
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
                    <el-table-column prop="cRId"  label="教室名称" sortable> </el-table-column>
                    <el-table-column prop="rStatus1"   label="预约状态" sortable> 
                        <template scope="scope" >
                            <p v-if="scope.row.rStatus1=='审核中'"  style="color:black;">审核中</p>
                            <p v-if="scope.row.rStatus1=='预约成功'"  style="color:green;">预约成功</p>
                            <p v-if="scope.row.rStatus1=='未通过'"  style="color:red;">未通过</p>
                            <p v-if="scope.row.rStatus1=='已撤回'"  style="color:blue;">已撤回</p>
                        </template> 
                    </el-table-column>
                    <el-table-column prop="rDate"         label="预约日期" sortable> </el-table-column>
                    <el-table-column prop="rTime1"        label="预约时间段">    </el-table-column>
                    <el-table-column prop="rType"        label="预约类型">    </el-table-column>
                    <el-table-column prop="rPhone"        label="联系方式">    </el-table-column> 
                    <el-table-column prop="remarks"        label="备注">    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope" >
                            <el-button  size="small" @click="handleEdit(scope.$index, scope.row)">重申</el-button>
                            <el-button v-if="scope.row.rStatus !=3 & scope.row.rStatus !=4" type="danger" size="small" @click="handleDel(scope.$index, scope.row)">撤回</el-button>
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

         <!--修改界面-->
        <el-dialog title="修改预约" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="预约教室" prop="cRId" style="width: 292px;">
                    <el-input v-model="editForm.cRId" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="预约日期" prop="rDate">
                    <el-date-picker
                            v-model="editForm.rDate"
                            type="date"
                            placeholder="选择预约日期"
                            align="right"
                            :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="预约时间段" prop="rTime1">
                    <el-select v-model="editForm.rTime" placeholder="选择时间段">
                        <el-option label="1-2节" value=1></el-option>
                        <el-option label="3-4节" value=2></el-option>
                        <el-option label="5-6节" value=3></el-option>
                        <el-option label="7-8节" value=4></el-option>
                        <el-option label="9-10节" value=5></el-option>
                        <el-option label="11-12节" value=6></el-option>
                     </el-select>
                </el-form-item>
                <el-form-item label="手机号码" prop="rPhone" style="width: 292px;">
                    <el-input v-model="editForm.rPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预约类型" prop="rType">
                    <el-select v-model="editForm.rType" placeholder="选择时间段">
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
                            v-model="editForm.remarks">
                    </el-input>
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
    import { getReservationListPage,updateReservation,changeStatus4} from '../../api/api';

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
                    cRId: '',
                    rStatus:null,
                    rStatus1: '',
                    rDate:'',
                    rTime1:'',
                    rType:'',
                    rPhone:'',
                    remarks:'',
                },
                panelTitle: '预约列表',
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
                    cRId: '',
                    rStatus: 0,
                    rStatus1: '',
                    rDate:'',
                    rTime1:'',
                    rType:'',
                    rPhone:'',
                    remarks:'',
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
                pagStutus:0,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
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
                //编辑界面数据
                editForm: {
                    reservationId:"",
                    cRId:'',
                    rDate:'',
                    rTime:"",
                    rTime1:"",
                    rType:'',
                    rPhone:'',
                    remarks:''
                },
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
                this.getReservation();
            },
            handleCurrentChange(val) {
                this.listQuery.curPage = val;
                this.getReservation();
            },
            //刷新
            on_refresh(){
                this.getReservation();
            },
            //获取预约列表
            getReservation() {
                this.listLoading = true;
                //NProgress.start();
                var para;
                if(this.filters.rStatus ==null) { 
                    para = {
                    curPage: this.listQuery.curPage,
                    pageSize: this.listQuery.pageSize,
                    cRId: this.filters.cRId,
                    rDate: this.filters.rDate,
                    rStatus:0
                    }
                } 
                else para = {
                    curPage: this.listQuery.curPage,
                    pageSize: this.listQuery.pageSize,
                    cRId: this.filters.cRId,
                    rDate: this.filters.rDate,
                    rStatus:this.filters.rStatus
                };
                console.log(para);
                getReservationListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.maintains = res.data.data;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //撤回
            handleDel: function (index, row) {
                this.$confirm('确认撤回申请吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {reservationId: row.reservationId};
                    console.log(para);
                    changeStatus4(para).then((res) => {
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
                        this.getReservation();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                var date=new Date(row.rDate);
                this.editForm.rDate = date;
                this.editForm.rTime1=row.rTime;
            },
              //重申
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                           var para = { reservationId:this.editForm.reservationId,crid: this.editForm.cRId,rDate: this.editForm.rDate,
                                        rTime: this.editForm.rTime,rType:this.editForm.rType,rPhone: this.editForm.rPhone,
                                        remarks: this.editForm.remarks,rTime1: this.editForm.rTime1 };
                            console.log(para);
                            updateReservation(para).then((res) => {
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
                                this.getReservation();
                                }
                            });
                        });
                    }
                });
            }
        },
        mounted() {
            this.getReservation();
        }
    }

</script>

<style scoped>

</style>