import request from './index'
const API = '/proxyapi'
const APIAuthen='/proxyapiAuthen'
//const fileUrl=`/proxyapiFaas/basefile`
const APIFaas=`/proxyapiFaas`
const fileUrl=APIFaas+`/fileapi/upload/szzx001` //
const downloadURL=`https://www.zxpaas.com/faas/fileapi/download/szzx001`

export {
  fileUrl,
  downloadURL
}

// 工作流统计

export function getBusinessTaskCount(userid, status) {
    return request({
        url: '/proxyapiBusiness/business/task/count/' + userid + '?status=' + status,
        method:'get'
    })()
}

export function getBusinessWaitReadCount(userid, status) {
    return request({
        url: '/proxyapiBusiness/business/waitRead/count/' + userid + '?readstatus=' + status,
        method:'get'
    })()
}


export function getHomePageData() {
  return request({
      url:'/proxyapiwaas/flow/monitor/getHomePageData',
      method:'get'
  })()
}

//***************文件服务******************* */
//删除文件
export function delFile(query){
  return request({
     url:APIFaas+'/fileapi/delFile/szzx001/'+query,
     method:'post'
  })()
}
//下载/预览
export function download(query){
  return request({
     url:APIFaas+'/fileapi/download/szzx001/'+query,
     method:'post'
  })()
}
//查询文件
export function searchFile(query){
  return request({
     url:APIFaas+'/fileapi/search/szzx001/'+query,
     method:'post'
  })()
}



//获取用户信息
export function getPersonnelInformation(query){
  return request({
    url:API+'/getPersonnelInformation',
    method:'get',
    params:query
  })()
}


//获取用户信息
export function getuserinfo(){
  return request({
    url:APIAuthen+'/base/userinfo',
    method:'get'
  })()
}



//查询客户信息
export function getCustomer(query){
  return request({
    url:API+'/getCustomer',
    method:'get',
    params:query
  })()
}

//更改用户信息
export function personnelEdit(query){
  return request({
    url:API+'/personnelEdit',
    method:'post',
    data:query
  })()
}

//根据编号查询数据字典
export function getDataCode(query){
  return request({
    url:API+'/base/code/'+query,
    method:'get'
  })()
}

//根据用户编号获取用户的相关信息
export function personnelInformationCount(query){
  return request({
    url:API+'/personnelInformationCount',
    method:'get',
    params:query
  })()
}


//查询客户信息count
export function customerCount(query){
  return request({
    url:API+'/customerCount',
    method:'get',
    params:query
  })()
}

//删除客户信息
export function customerDelete(query){
  return request({
    url:API+'/customerDelete',
    method:'post',
    data:query
  })()
}

//id查询客户信息
export function customerId(query){
  return request({
    url:API+'/customerId',
    method:'get',
    params:query
  })()
}

//地址信息查询
export function getAddressInformation(query){
  return request({
     url:API+'/getAddressInformation',
     method:'get',
     params:query
  })()
}

//地址信息新增
export function addressInformationAdd(query){
  return request({
     url:API+'/addressInformationAdd',
     method:'post',
     data:query
  })()
}

//修改地址信息
export function addressInformationEdit(query){
  return request({
     url:API+'/addressInformationEdit',
     method:'post',
     data:query
  })()
}

//删除地址信息
export function addressInformationDel(query){
  return request({
     url:API+'/addressInformationDel',
     method:'post',
     data:query
  })()
}

//修改客户信息
export function customerEdit(query){
  return request({
     url:API+'/customerEdit',
     method:'post',
     data:query
  })()
}

//新增客户信息
export function customerAdd(query){
  return request({
     url:API+'/customerAdd',
     method:'post',
     data:query
  })()
}
//项目管理---根据人员ID查询所在用户组
export function getProjectGroup(query){
  return request({
     url:APIAuthen+'/base/departGroupAndUserInfo/'+query.userid,
     method:'get'
  })()
}

//项目管理---新增项目
export function saveNewProject(query){
  return request({
     url:API+'/pm/saveNewProject',
     method:'post',
     data:query
  })()
}

//项目管理---查询项目列表List
export function getProjectList(query){
  return request({
    url:API+'/pm/getProjectList',
    method:'get',
    params:query
  })()
}
//项目管理---查询项目总数Count
export function getProjectCount(query){
  return request({
    url:API+'/pm/getProjectCount',
    method:'get',
    params:query
  })()
}


//项目管理---根据ID查询项目详情
export function getProjectById(query){
  return request({
    url:API+'/pm/getProjectById',
    method:'get',
    params:query
  })()
}

//项目管理---修改项目
export function updateProject(query){
  return request({
     url:API+'/pm/updateProject',
     method:'post',
     data:query
  })()
}

//项目管理---删除项目
export function deleteProject(query){
  return request({
     url:API+'/pm/deleteProject',
     method:'get',
     params:query
  })()
}


//证件信息查询
export function getCertificateInformation(query){
  return request({
     url:API+'/getCertificateInformation',
     method:'get',
     params:query
  })()
}


//证件信息新增
export function certificateInformationAdd(query){
  return request({
     url:API+'/certificateInformationAdd',
     method:'post',
     data:query
  })()
}

//证件信息编辑
export function certificateInformationEdit(query){
  return request({
     url:API+'/certificateInformationEdit',
     method:'post',
     data:query
  })()
}

//证件信息删除
export function certificateInformationDel(query){
  return request({
     url:API+'/certificateInformationDel',
     method:'post',
     data:query
  })()
}

//证件信息-文件删除
export function certificateInformationFiledel(query){
  return request({
     url:API+'/certificateInformationFiledel',
     method:'post',
     data:query
  })()
}

 

//银行卡信息查询
export function getBankCard(query){
  return request({
     url:API+'/getBankCard',
     method:'get',
     params:query
  })()
}

//银行卡信息编辑
export function bankCardEdit(query){
  return request({
     url:API+'/bankCardEdit',
     method:'post',
     data:query
  })()
}

//银行卡信息新增
export function bankCardAdd(query){
  return request({
     url:API+'/bankCardAdd',
     method:'post',
     data:query
  })()
}


//银行卡信息删除
export function bankCardDel(query){
  return request({
     url:API+'/bankCardDel',
     method:'post',
     data:query
  })()
}

//银行卡附件删除
export function bankCardFileDel(query){
  return request({
     url:API+'/bankCardfileDel',
     method:'post',
     data:query
  })()
}

//教育背景信息查询
export function getEducationBackground(query){
  return request({
     url:API+'/getEducationBackground',
     method:'get',
     params:query
  })()
}

//教育背景信息编辑
export function educationBackgroundEdit(query){
  return request({
     url:API+'/educationBackgroundEdit',
     method:'post',
     data:query
  })()
}

//教育背景信息新增
export function educationBackgroundAdd(query){
  return request({
     url:API+'/educationBackgroundAdd',
     method:'post',
     data:query
  })()
}

//教育背景信息删除
export function educationBackgroundDel(query){
  return request({
     url:API+'/educationBackgroundDel',
     method:'post',
     data:query
  })()
}

//教育背景信息毕业证删除
export function educationBackgroundDiplomaDel(query){
  return request({
     url:API+'/educationBackgroundDiplomaDel',
     method:'post',
     data:query
  })()
}


//教育背景信息学位证删除
export function educationBackgroundDegreeDel(query){
  return request({
     url:API+'/educationBackgroundDegreeDel',
     method:'post',
     data:query
  })()
}



//工作经历信息查询
export function getWorkExperience(query){
  return request({
     url:API+'/getWorkExperience',
     method:'get',
     params:query
  })()
}

//教育背景信息修改
export function workExperienceEdit(query){
  return request({
     url:API+'/workExperienceEdit',
     method:'post',
     data:query
  })()
}
 
//教育背景信息新增
export function workExperienceAdd(query){
  return request({
     url:API+'/workExperienceAdd',
     method:'post',
     data:query
  })()
}

//教育背景信息删除
export function workExperienceDel(query){
  return request({
     url:API+'/workExperienceDel',
     method:'post',
     data:query
  })()
}

//岗位查询
export function postQuery(query){
  return request({
     url:API+'/postQuery',
     method:'get',
     params:query
  })()
}

//级别查询
export function levelQuery(query){
  return request({
     url:API+'/levelQuery',
     method:'get',
     params:query
  })()
}

//联系人查询
export function getContacts(query){
  return request({
     url:API+'/getContacts',
     method:'get',
     params:query
  })()
}

//编辑联系人
export function contactsEdit(query){
  return request({
     url:API+'/contactsEdit',
     method:'post',
     data:query
  })()
}
//新增联系人
export function contactsAdd(query){
  return request({
     url:API+'/contactsAdd',
     method:'post',
     data:query
  })()
}
//删除联系人
export function contactsDel(query){
  return request({
     url:API+'/contactsDel',
     method:'post',
     data:query
  })()
}

//相关技能查询
export function getSkills(query){
  return request({
     url:API+'/getSkills',
     method:'get',
     params:query
  })()
}

//相关技能编辑
export function skillsEdit(query){
  return request({
     url:API+'/skillsEdit',
     method:'post',
     data:query
  })()
}

//相关技能新增
export function skillsAdd(query){
  return request({
     url:API+'/skillsAdd',
     method:'post',
     data:query
  })()
}

//相关技能删除
export function skillsDel(query){
  return request({
     url:API+'/skillsDel',
     method:'post',
     data:query
  })()
}

//证书查询
export function getCertificateInformationBook(query){
  return request({
     url:API+'/getCertificateInformationBook',
     method:'get',
     params:query
  })()
}

//证书编辑
export function certificateInformationBookEdit(query){
  return request({
     url:API+'/certificateInformationBookEdit',
     method:'post',
     data:query
  })()
}
//证书新增
export function certificateInformationBookAdd(query){
  return request({
     url:API+'/certificateInformationBookAdd',
     method:'post',
     data:query
  })()
}
//证书删除
export function certificateInformationBookDel(query){
  return request({
     url:API+'/certificateInformationBookDel',
     method:'post',
     data:query
  })()
}

//证书附件删除
export function certificateInformationBookFileDel(query){
  return request({
     url:API+'/certificateInformationBookFileDel',
     method:'post',
     data:query
  })()
}













 















