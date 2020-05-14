/**
 * Created by dongxingbin on 17/7/28.
 */

//const base = ''
const base = '/api'

//登录
export const login = base + '/login';
//修改个人信息
export const updatePsd = base + '/updatePsd';
//修改密码
export const updateUser = base + '/updateUser';

//教室列表
export const classroomListpage = base + '/getClassroom';
//教室管理
export const classroomUpdate = base + '/updateClassroom';
//预约申请
export const reserveAdd = base + '/reserve';

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
//删除反馈
export const feedbackDeleteAdmin = base + '/deleteFeedbackAdmin';
