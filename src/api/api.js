import axios from 'axios';
import * as url from './urlConfig'

//登录
export const requestLogin = params => { return axios.post(url.login, params).then(res => res.data); };


//教室列表
export const getMaintainListPage = params => { return axios.get(url.maintainListpage, { params: params }); };
//教室管理
export const updateClassroom = params => { return axios.get(url.classroomUpdate, { params: params }); };
//预约申请
export const addMaintain = params => { return axios.get(url.maintainAdd, { params: params }); };


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



export const getUserList = params => { return axios.get(url.userList, { params: params }); };

export const getUserListPage = params => { return axios.get(url.userListpage, { params: params }); };

export const removeUser = params => { return axios.get(url.userRemove, { params: params }); };

export const batchRemoveUser = params => { return axios.get(url.userBatchremove, { params: params }); };

export const editUser = params => { return axios.get(url.userEdit, { params: params }); };

export const addUser = params => { return axios.get(url.userAdd, { params: params }); };


//category
export const getCategoryList = params => { return axios.get(url.categoryList, { params: params }); };

export const getCategoryListPage = params => { return axios.get(url.categoryListpage, { params: params }); };

export const removeCategory = params => { return axios.get(url.categoryRemove, { params: params }); };

export const batchRemoveCategory = params => { return axios.get(url.categoryBatchremove, { params: params }); };

export const editCategory = params => { return axios.get(url.categoryEdit, { params: params }); };

export const addCategory = params => { return axios.get(url.categoryAdd, { params: params }); };

//maintain
export const getMaintainList = params => { return axios.get(url.maintainList, { params: params }); };



export const removeMaintain = params => { return axios.get(url.maintainRemove, { params: params }); };

export const batchRemoveMaintain = params => { return axios.get(url.maintainBatchremove, { params: params }); };

export const editMaintain = params => { return axios.get(url.maintainEdit, { params: params }); };

//plan
export const getPlanList = params => { return axios.get(url.planList, { params: params }); };

export const getPlanListPage = params => { return axios.get(url.planListpage, { params: params }); };

export const removePlan = params => { return axios.get(url.planRemove, { params: params }); };

export const batchRemovePlan = params => { return axios.get(url.planBatchremove, { params: params }); };

export const editPlan = params => { return axios.get(url.planEdit, { params: params }); };

export const addPlan = params => { return axios.get(url.planAdd, { params: params }); };