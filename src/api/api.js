import axios from 'axios';
import * as url from './urlConfig'

//登录
export const requestLogin = params => { return axios.post(url.login, params).then(res => res.data); };
//修改个人信息
export const updatePsd = params => { return axios.get(url.updatePsd, { params: params }); };
//修改密码
export const updateUser = params => { return axios.get(url.updateUser, { params: params }); };

//教室列表
export const getClassroomListPage = params => { return axios.get(url.classroomListpage, { params: params }); };
//教室管理
export const updateClassroom = params => { return axios.get(url.classroomUpdate, { params: params }); };
//预约申请
export const addReserve = params => { return axios.get(url.reserveAdd, { params: params }); };


//预约列表
export const getReservationListPage = params => { return axios.get(url.reservationListPage, { params: params }); };
//预约修改
export const updateReservation = params => { return axios.get(url.updateReservation, { params: params }); };
//预约撤回
export const changeStatus4 = params => { return axios.get(url.changeStatus4, { params: params }); };
//预约审核列表
export const getReservationCheck = params => { return axios.get(url.reservationCheckPage, { params: params }); };
//预约通过
export const changeStatus2 = params => { return axios.get(url.changeStatus2, { params: params }); };
//预约不通过
export const changeStatus3 = params => { return axios.get(url.changeStatus3, { params: params }); };

//反馈列表
export const getFeedbackListPage = params => { return axios.get(url.feedbackListpage, { params: params }); };
//反馈
export const addFeedback = params => { return axios.get(url.feedbackAdd, { params: params }); };
//撤回反馈
export const deleteFeedback = params => { return axios.get(url.feedbackDelete, { params: params }); };
//反馈处理
export const changeFeedback = params => { return axios.get(url.feedbackChange, { params: params }); };
//删除反馈
export const deleteFeedbackAdmin = params => { return axios.get(url.feedbackDeleteAdmin, { params: params }); };