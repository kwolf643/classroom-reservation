/**
 * Created by dongxingbin on 17/7/28.
 */

//const base = ''
const base = '/api'

//登录
export const login = base + '/login';

//教室列表
export const maintainListpage = base + '/getClassroom';
//教室管理
export const classroomUpdate = base + '/updateClassroom';
//预约申请
export const maintainAdd = base + '/reserve';

//预约列表
export const reservationListPage = base + '/getReservation';
//预约修改
export const updateReservation = base + '/updateReservation';
//预约撤回
export const changeStatus4 = base + '/changeStatus4';
//预约审核列表
export const reservationCheckPage = base + '/getReservationCheck';
//预约通过
export const changeStatus2 = base + '/changeStatus2';
//预约不通过
export const changeStatus3 = base + '/changeStatus3';

//反馈列表
export const feedbackListpage = base + '/getFeedback';
//反馈
export const feedbackAdd = base + '/addFeedback';
//撤回反馈
export const feedbackDelete = base + '/deleteFeedback';
//反馈处理
export const feedbackChange = base + '/changeFeedback';







export const userList = base + '/user/list';

export const userListpage = base + '/user/listpage';

export const userRemove = base + '/user/remove';

export const userBatchremove = base + '/user/batchremove';

export const userEdit = base + '/user/edit';

export const userAdd = base + '/user/add';

//category
export const categoryList = base + '/category/list';

export const categoryListpage = base + '/category/listpage';

export const categoryRemove = base + '/category/remove';

export const categoryBatchremove = base + '/category/batchremove';

export const categoryEdit = base + '/category/edit';

export const categoryAdd = base + '/category/add';

//maintain
export const maintainList = base + '/maintain/list';


// export const maintainListpage = base + '/MaintainService.svc/GetMaintainItems';

export const maintainRemove = base + '/maintain/remove';

export const maintainBatchremove = base + '/maintain/batchremove';

export const maintainEdit = base + '/maintain/edit';



//plan
export const planList = base + '/plan/list';

export const planListpage = base + '/plan/listpage';

export const planRemove = base + '/plan/remove';

export const planBatchremove = base + '/plan/batchremove';

export const planEdit = base + '/plan/edit';

export const planAdd = base + '/plan/add';
