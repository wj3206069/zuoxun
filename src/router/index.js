import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../components/layout/Layout';
import Main from '../components/main/Main';
import Business from '../components/Business/Business';
import SolvedBusiness from '../components/Business/SolvedBusiness';
import ReadBusiness from '../components/Business/ReadBusiness';
import BookBarks from '../components/bookmark/index';
import BookBarksEdit from '../components/bookmark/edit';
import User from '../components/userinfo/index';

import Submenu from '~/components/layout/Submenu';
import newflow from '~/pages/flow/newflow';
import todoFlow from '~/pages/flow/todoflow';
import store from '../store/store'

//项目管理-----------start
import ProjectManager from '~/components/projectmanager'; // 项目管理首页有数据
import ProjectHeader from '~/components/projectmanager/BasicSituation'; // 项目管理侧边栏
import Noproject from '~/components/projectmanager/Noproject'; // 项目管理首页无数据
import ProjectList from '~/components/projectmanager/ProjectList'; // 项目管理列表
import ProjectDetail from '~/components/projectmanager/ProjectDetail'; // 项目管理详情
import UpdateProject from '~/components/projectmanager/UpdateProject'; // 项目管理详情
import AddProject from '~/components/projectmanager/AddProject'; // 项目管理增加
import NoSysManager from '~/components/projectmanager/systemmanager/NoData'; // 系统管理无数据
import DENoData from '~/components/projectmanager/deployenvironment/NoData'; // 员工管理
import CPNoData from '~/components/projectmanager/codeproject/NoData'; //
import APNoData from '~/components/projectmanager/applicationproduct/NoData'; //
import PTNoData from '~/components/projectmanager/projecttask/NoData'; //
//项目管理-----------end

//客户关系管理
import customManager from '~/components/custommanager'; // 客户首页
import customManagerHeader from '~/components/custommanager/customship/CustomManager'; // 客户
import CMNoData from '~/components/custommanager/customship/NoData'; // 客户无数据
import customTable from '~/components/custommanager/customship/customTable'; // 客户列表
import addCustom from '~/components/custommanager/customship/AddCustom'; // 增加客户
import CMDetailRevise from '~/components/custommanager/customship/DetailRevise'; // 修改客户-客户详情
import Contacts from '~/components/custommanager/contacts/Contact'; // 联系人
import CNoData from '~/components/custommanager/contacts/NoData'; // 联系人无数据
import ContactTable from '~/components/custommanager/contacts/ContactTable'; // 联系人列表
import AddContact from '~/components/custommanager/contacts/AddContact'; // 增加联系人
import CDetailRevise from '~/components/custommanager/contacts/DetailRevise'; // 修改联系人-联系人详情
import BusinessChance from '~/components/custommanager/businesschance/BusinessChance'; // 商机
import BCNoData from '~/components/custommanager/businesschance/NoData'; // 商机无数据
import BCTable from '~/components/custommanager/businesschance/BusinessChanceTable'; // 商机列表
import AddBusinessChance from '~/components/custommanager/businesschance/AddBusinessChance'; // 增加商机
import BCDetailRevise from '~/components/custommanager/businesschance/DetailRevise'; // 修改商机-商机详情
import visit from '~/components/custommanager/visit/visit'; // 拜访
import VNoData from '~/components/custommanager/visit/NoData'; // 拜访无数据
import VisitTable from '~/components/custommanager/visit/VisitTable'; // 拜访列表
import AddVisit from '~/components/custommanager/visit/AddVisit'; // 增加拜访
import VDetailRevise from '~/components/custommanager/visit/DetailRevise'; // 修改边防-拜访详情

import checkingIn from '~/components/checkingin';
import conmponentHeader from '~/components/checkingin/conmponentheader';
import work from '~/components/checkingin/work';
import attendanceStatistics from '~/components/checkingin/attendanceStatistics';
import subsidizedStatistics from '~/components/checkingin/subsidizedStatistics';
import paidTime from '~/components/checkingin/paidTime';
import vacationStatistics from '~/components/checkingin/vacationStatistics';
import attendanceDetails from '~/components/checkingin/attendanceDetails';
import HolidayStep from '~/components/checkingin/holidaystep'; // 请假申请
import HolidayExamine from '~/components/checkingin/holidayExamine'; // 请假申请
import HolidayTakeWork from '~/components/checkingin/holidayTakeWork'; // 请假申请
import HolidayApply from '~/components/checkingin/holidayApply'; // 请假流程
import HolidayDetail from '~/components/checkingin/HolidayDetail'; // 请假流程详情
import StatisticsHoliday from '~/components/checkingin/statisticsholiday'; // 休假统计
import StatisticsHolidayDetail from '~/components/checkingin/statisticsholidaydetail'; // 休假统计详情
import punchOut from '~/components/checkingin/punchOut';
import onDuty from '~/components/checkingin/onDuty';
import setClock from '~/components/checkingin/setClock';
import editor from '~/components/checkingin/editor';

//公司资质
import RuanShiLi from '~/components/ruanshili'; // 软实力
import CompanyZiZhi from '~/components/ruanshili/companyzizhi'; // 资质首页
import ZiZhiRecords from '~/components/ruanshili/zizhirecords'; // 项目管理首页
import ZiZhiTest from '~/components/ruanshili/zizhitest'; // 资质测试首页
import ZiZhiShenQing from '~/components/ruanshili/zizhishenqing'; // 资质申请首页
import DeviceDetail from '~/components/ruanshili/device_Detail'; // 设备详情首页
import Borrow_rec from '~/components/ruanshili/borrow_rec'; // 项目管理首页
import Application from '~/components/ruanshili/Application'; // 项目管理首页
import ApplyDetail from '~/components/ruanshili/ApplyDetail'; // 申请详情
import ReqApplication from '~/components/ruanshili/ReqApplication'; //
import DeviceReturn from '~/components/ruanshili/device_return'; //
import ReturnStep from '~/components/ruanshili/Return_Step'; //
import RetApplication from '~/components/ruanshili/RetApplication'; //
import Device_appro from '~/components/ruanshili/device_appro'; // 设备申请
import Shebeishiyong from '~/components/ruanshili/shebeishiyong'; // 设备使用
import Shebeiweixiu from '~/components/ruanshili/shebeiweixiu'; // 设备维修
import Shebeibaofei from '~/components/ruanshili/shebeibaofei'; // 设备报废
import Renyuanshiyong from '~/components/ruanshili/renyuanshiyong'; // 人员试用
import ToShenPi from '~/components/ruanshili/toShenPi'; // 审批
import xinjianbaoxiudan from '~/components/ruanshili/xinjianbaoxiudan'; // 新建保修单
import xinjianbaofeidan from '~/components/ruanshili/xinjianbaofeidan'; // 新建报废单
import xinjianzhuanyidan from '~/components/ruanshili/xinjianzhuanyidan'; // 新建转移单
import informationChange from '~/components/ruanshili/informationChange'; //
import xinjianweibaodan from '~/components/ruanshili/xinjianweibaodan'; //
import zichanpandian from '~/components/ruanshili/zichanpandian'; // 资产盘点
import assetCount from '~/components/ruanshili/assetCount'; //
import zhuanyiPage from '~/components/ruanshili/zhuanyiPage'; // 转移页面
import zichanqingdan from '~/components/ruanshili/zichanqingdan'; // 资产清点
import zichanDetail from '~/components/ruanshili/zichanDetail'; // 资产详情

import CompanyQualification from '~/components/ruanshili/qualification/companyqualification/CompanyQualification'; // 公司资质
import CQNoData from '~/components/ruanshili/qualification/companyqualification/NoData'; // 公司资质无数据
import AddCompanyQua from '~/components/ruanshili/qualification/companyqualification/AddCompanyQua'; // 增加公司资质
import CompanyQuaTable from '~/components/ruanshili/qualification/companyqualification/CompanyQuaTable'; // 公司资质首页
import CompanyQuaDetail from '~/components/ruanshili/qualification/companyqualification/CompanyQuaDetail'; // 公司资质详情
import CompanyQuaCheckOnce from '~/components/ruanshili/qualification/companyqualification/CompanyQuaCheckOnce'; // 公司资质审查

//资质统计
import QualificationCount from '~/components/ruanshili/qualification/qualificationcount/QualificationCount'; // 资质统计
import QCIndex from '~/components/ruanshili/qualification/qualificationcount/index'; // 资质统计首页

//员工资质
import EmployeeQualification from '~/components/ruanshili/qualification/employeequalification/EmployeeQualification'; // 员工资质
import EmployeeTable from '~/components/ruanshili/qualification/employeequalification/EmployeeTable'; // 员工资质首页
import AddEmployee from '~/components/ruanshili/qualification/employeequalification/AddEmployee'; //员工资质添加
import EmployeeDetail from '~/components/ruanshili/qualification/employeequalification/EmployeeDetail'; // 员工资质详情
import EmployeeCheck from '~/components/ruanshili/qualification/employeequalification/EmployeeCheck'; // 员工资质审查

//政府资质
import GovermentQua from '~/components/ruanshili/qualification/govermentqualification/GovermentQua'; // 政府资质
import GoverQuaTable from '~/components/ruanshili/qualification/govermentqualification/GoverQuaTable'; // 政府资质首页
import AddGovQua from '~/components/ruanshili/qualification/govermentqualification/AddGovQua'; // 政府资质添加
import GovQuaDetail from '~/components/ruanshili/qualification/govermentqualification/GovQuaDetail'; // 政府资质详情

//政府系统填报
import SystemSubmit from '~/components/ruanshili/qualification/systemsubmit/SystemSubmit'; // 政府系统填报
import SysSubTable from '~/components/ruanshili/qualification/systemsubmit/SysSubTable'; // 政府系统填报首页
import AddSysSub from '~/components/ruanshili/qualification/systemsubmit/AddSysSub'; // 政府系统填报添加
import SysSubDetail from '~/components/ruanshili/qualification/systemsubmit/SysSubDetail'; // 政府系统填报详情

//行政管理

import rukuManager from '~/components/ruanshili/rukuManager';

//人事管理
import HRmanagement from '~/components/HRmanagement'; //人事管理
import UserInfo from '~/components/HRmanagement/userInfo'; //人员信息
import AddressManage from '~/components/HRmanagement/addressManage'; //地址信息
import CertificateManage from '~/components/HRmanagement/certificateManage'; //证书信息
import DocumentManage from '~/components/HRmanagement/documentManage'; //证件信息
import BankManage from '~/components/HRmanagement/bankManage'; //银行信息
import EduManage from '~/components/HRmanagement/eduManage'; //教育背景
import WorkManage from '~/components/HRmanagement/workManage'; //工作经历
import LinkmanManage from '~/components/HRmanagement/linkmanManage'; //紧急联系人
import SkillManage from '~/components/HRmanagement/skillManage'; //相关技能

// 财务管理
import costmanagement from '~/components/financialmanager/costmanagement'; 
import borrow from '~/components/financialmanager/costmanagement/borrow'; 
import expenses from '~/components/financialmanager/costmanagement/expenses'; 
import account from '~/components/financialmanager/costmanagement/account'; 






//文件共享
import file from '~/pages/file/index';


//信息发布
import infopublish from '~/components/infopublish'
import noticeManager from '~/components/infopublish/notice/noticeManager'
import noticelist from '~/components/infopublish/notice/noticelist'  //通知列表
import noticepublish from '~/components/infopublish/notice/noticepublish' //通知编辑
import noticeDetail from '~/components/infopublish/notice/noticeDetail'  //通知详情
import mynotice from '~/components/infopublish/notice/mynotice'   //我的通知

import afficheManager from '~/components/infopublish/affiche/afficheManager'
import afficheList from '~/components/infopublish/affiche/afficheList'  //公告列表
import afficheEditor from '~/components/infopublish/affiche/editor'   //公告编辑
import afficheDetail from '~/components/infopublish/affiche/afficheDetail'  //公告详情
import myaffiche from '~/components/infopublish/affiche/myaffiche'   //我的公告

import messageHearder from '~/components/infopublish/message/messageHearder'  //公告详情
import mymessage from '~/components/infopublish/message/mymessage'   //我的公告

// import newflow from '~/pages/flow/newflow';
// import todoFlow from '~/pages/flow/todoFlow';

Vue.use(Router)
const route =new Router({
  // mode: 'hash',
  routes: [{
    path: '',
    redirect: '/index'
  },
  {
    path: '/',
    name: 'index',
    redirect: 'index',
    component: Layout,
    meta: {
      requiresAuthen: true
    },
    children: [
      {
        path: 'index',
        component: Main,
        meta: {
          requiresAuthen: true
        },
      },
      {
        path: 'flowtest',
        component: newflow
      },
      {
        path: 'todoflow',
        component: todoFlow
      },
      {
        path: 'business',
        component: Business,
        meta: {
          requiresAuthen: true
        }
      },
      {
        path: 'solvedBusiness',
        component: SolvedBusiness,
        meta: {
          requiresAuthen: true
        }
      },
      {
        path: 'readBusiness/:readstatus',
        component: ReadBusiness,
        meta: {
          requiresAuthen: true
        }
      },
      {
        path: 'bookBarks',
        component: BookBarks,
        meta: {
          requiresAuthen: true
        }
      },
      {
        path: 'bookBarksEdit/:id',
        component: BookBarksEdit,
        meta: {
          requiresAuthen: true
        }
      },
      {
        path: 'user',
        component: User,
        meta: {
          requiresAuthen: true
        }
      },
      
      
      {
        path: "ruanshili",
        name: "ruanshili",
        component: RuanShiLi,
        children: [{
            path: "rukuManager",
            name: "rukuManager",
            component: rukuManager,
            children: [{
                path: "zizhirecords",
                name: "zizhirecords",
                component: ZiZhiRecords
              },

              {
                path: "device_appro",
                name: "device_appro",
                component: Device_appro
              },

              {
                path: "xinjianbaoxiudan",
                name: "xinjianbaoxiudan",
                component: xinjianbaoxiudan
              },
              {
                path: "xinjianbaofeidan",
                name: "xinjianbaofeidan",
                component: xinjianbaofeidan
              },
              {
                path: "xinjianzhuanyidan",
                name: "xinjianzhuanyidan",
                component: xinjianzhuanyidan
              },
              {
                path: "toShenPi",
                name: "toShenPi",
                component: ToShenPi
              },
              {
                path: "zichanDetail",
                name: "zichanDetail",
                component: zichanDetail
              },
              {
                path: "shebeishiyong",
                name: "shebeishiyong",
                component: Shebeishiyong
              },
              {
                path: "xinjianweibaodan",
                name: "xinjianweibaodan",
                component: xinjianweibaodan
              },
              {
                path: "renyuanshiyong",
                name: "renyuanshiyong",
                component: Renyuanshiyong
              },
              {
                path: "zichanpandian",
                name: "zichanpandian",
                component: zichanpandian
              },
              {
                path: "informationChange",
                name: "informationChange",
                component: informationChange
              },
              {
                path: "shebeiweixiu",
                name: "shebeiweixiu",
                component: Shebeiweixiu
              },
              {
                path: "shebeibaofei",
                name: "shebeibaofei",
                component: Shebeibaofei
              },
              {
                path: "RetApplication",
                name: "RetApplication",
                component: RetApplication
              },
              {
                path: "zhuanyiPage",
                name: "zhuanyiPage",
                component: zhuanyiPage
              },
              {
                path: "zichanqingdan",
                name: "zichanqingdan",
                component: zichanqingdan
              },
              {
                path: "Return_Step",
                name: "Return_Step",
                component: ReturnStep
              },
              {
                path: "device_return",
                name: "device_return",
                component: DeviceReturn
              },
              {
                path: "ReqApplication",
                name: "ReqApplication",
                component: ReqApplication
              },
              {
                path: "ApplyDetail",
                name: "ApplyDetail",
                component: ApplyDetail
              },
              {
                path: "Application",
                name: "Application",
                component: Application
              },
              {
                path: "device_Detail",
                name: "device_Detail",
                component: DeviceDetail
              },
              {
                path: "borrow_rec",
                name: "borrow_rec",
                component: Borrow_rec
              },
              {
                path: "zizhiTest",
                name: "zizhiTest",
                component: ZiZhiTest
              },
              {
                path: "assetCount",
                name: "assetCount",
                component: assetCount
              },
              {
                path: "zizhishenqing",
                name: "zizhishenqing",
                component: ZiZhiShenQing,
                meta: {
                  requiresAuthen: false
                }
              },
            ]
          },
          {
            path: 'CompanyQualification',
            name: 'CompanyQualification',
            component: CompanyQualification,
            children: [{
              path: 'CQNoData',
              name: 'CQNoData',
              component: CQNoData
            }, {
              path: 'AddCompanyQua',
              name: 'AddCompanyQua',
              component: AddCompanyQua
            }, {
              path: 'CompanyQuaTable',
              name: 'CompanyQuaTable',
              component: CompanyQuaTable
            }, {
              path: 'CompanyQuaDetail',
              name: 'CompanyQuaDetail',
              component: CompanyQuaDetail
            }, {
              path: 'CompanyQuaCheckOnce',
              name: 'CompanyQuaCheckOnce',
              component: CompanyQuaCheckOnce
            }]
          },
          {
            path: 'QualificationCount',
            name: 'QualificationCount',
            component: QualificationCount,
            children: [{
              path: 'QCIndex',
              name: 'QCIndex',
              component: QCIndex
            }]
          }, {
            path: 'EmployeeQualification',
            name: 'EmployeeQualification',
            component: EmployeeQualification,
            children: [{
              path: 'EmployeeTable',
              name: 'EmployeeTable',
              component: EmployeeTable
            }, {
              path: 'AddEmployee',
              name: 'AddEmployee',
              component: AddEmployee
            }, {
              path: 'EmployeeDetail',
              name: 'EmployeeDetail',
              component: EmployeeDetail
            }, {
              path: 'EmployeeCheck',
              name: 'EmployeeCheck',
              component: EmployeeCheck
            }]
          }, {
            path: 'GovermentQua',
            name: 'GovermentQua',
            component: GovermentQua,
            children: [{
              path: 'GoverQuaTable',
              name: 'GoverQuaTable',
              component: GoverQuaTable
            }, {
              path: 'AddGovQua',
              name: 'AddGovQua',
              component: AddGovQua
            }, {
              path: 'GovQuaDetail',
              name: 'GovQuaDetail',
              component: GovQuaDetail
            }]
          }, {
            path: 'SystemSubmit',
            name: 'SystemSubmit',
            component: SystemSubmit,
            children: [{
              path: 'SysSubTable',
              name: 'SysSubTable',
              component: SysSubTable
            }, {
              path: 'AddSysSub',
              name: 'AddSysSub',
              component: AddSysSub
            }, {
              path: 'SysSubDetail',
              name: 'SysSubDetail',
              component: SysSubDetail
            }]
          }
        ]
      },
      {
        path: "projectManager",
        name: "projectManager",
        component: ProjectManager,
        children: [{
            path: "BasicSituation",
            name: "BasicSituation",
            component: ProjectHeader,
            children: [{
                path: 'NoProject',
                name: "NoProject",
                component: Noproject
              },
              {
                path: 'ProjectList',
                name: 'ProjectList',
                component: ProjectList
              },
              {
                path: 'ProjectDetail',
                name: 'ProjectDetail',
                component: ProjectDetail
              },
              {
                path: 'UpdateProject',
                name: 'UpdateProject',
                component: UpdateProject
              },
              {
                path: 'AddProject',
                name: 'AddProject',
                component: AddProject
              }
            ]
          },
          {
            path: "SystemManager",
            name: "SystemManager",
            component: ProjectHeader,
            children: [{
              path: "NoSysManager",
              name: "NoSysManager",
              component: NoSysManager
            }]
          }, {
            path: "DeployEnvironment",
            name: "DeployEnvironment",
            component: ProjectHeader,
            children: [{
              path: "DENoData",
              name: "DENoData",
              component: DENoData
            }]
          }, {
            path: "CodeProject",
            name: "CodeProJect",
            component: ProjectHeader,
            children: [{
              path: "CPNoData",
              name: "CPNoData",
              component: CPNoData
            }]
          }, {
            path: "ApplicationProject",
            name: "ApplicationProject",
            component: ProjectHeader,
            children: [{
              path: "APNoData",
              name: "APNoData",
              component: APNoData,
            }]
          },
          {
            path: "ProjectTask",
            name: "ProjectTask",
            component: ProjectHeader,
            children: [{
              path: "PTNoData",
              name: "PTNoData",
              component: PTNoData
            }]
          }
        ]
      },
      {
        path: 'customManager',
        name: 'customManager',
        component: customManager,
        children: [{
            path: 'customrelationship',
            name: 'customrelationship',
            component: customManagerHeader,
            children: [{
              path: 'NoData',
              name: 'CMNoData',
              component: CMNoData
            }, {
              path: 'CustomTable',
              name: 'CustomTable',
              component: customTable
            }, {
              path: 'AddCustom',
              name: 'AddCustom',
              component: addCustom
            }, {
              path: 'CMDetailRevise',
              name: 'CMDetailRevise',
              component: CMDetailRevise
            }]
          }, {
            path: 'Contacts',
            name: 'Contacts',
            component: Contacts,
            children: [{
              path: 'CNoData',
              name: 'CNoData',
              component: CNoData
            }, {
              path: 'ContactTable',
              name: 'ContactTable',
              component: ContactTable
            }, {
              path: 'AddContact',
              name: 'AddContact',
              component: AddContact
            }, {
              path: 'CDetailRevise',
              name: 'CDetailRevise',
              component: CDetailRevise
            }]
          },
          {
            path: 'BusinessChance',
            name: 'BusinessChance',
            component: BusinessChance,
            children: [{
              path: 'BCNoData',
              name: 'BCNoData',
              component: BCNoData
            }, {
              path: 'BCTable',
              name: 'BCTable',
              component: BCTable
            }, {
              path: 'AddBusinessChance',
              name: 'AddBusinessChance',
              component: AddBusinessChance
            }, {
              path: 'BCDetailRevise',
              name: 'BCDetailRevise',
              component: BCDetailRevise
            }]
          }, {
            path: 'visit',
            name: 'visit',
            component: visit,
            children: [{
              path: 'VNoData',
              name: 'VNoData',
              component: VNoData
            }, {
              path: 'VisitTable',
              name: 'VisitTable',
              component: VisitTable
            }, {
              path: 'AddVisit',
              name: 'AddVisit',
              component: AddVisit
            }, {
              path: 'VDetailRevise',
              name: 'VDetailRevise',
              component: VDetailRevise
            }]
          }
        ]
      },
      {
        path: "checkingin",
        name: "checkingin",
        component: checkingIn,
        children: [{
          path: "conmponentheader",
          name: "conmponentheader",
          component: conmponentHeader,
          children: [{
              path: "work",
              name: "work",
              component: work,
            },
            {
              path: "attendanceStatistics",
              name: "attendanceStatistics",
              component: attendanceStatistics,
            },
            {
              path: "attendanceDetails/:id",
              name: "attendanceDetails",
              component: attendanceDetails,
              meta: {
                // requiresAuthen: false
              }
            },
            {
              path: "subsidizedStatistics",
              name: "subsidizedStatistics",
              component: subsidizedStatistics,
            },
            {
              path: "paidTime",
              name: "paidTime",
              component: paidTime,
            },
            {
              path: "vacationStatistics",
              name: "vacationStatistics",
              component: vacationStatistics,
            },
            {
              path: 'holidaystep',
              name: 'holidaystep',
              component: HolidayStep
            },
            {
              path: 'holidayExamine',
              name: 'holidayExamine',
              component: HolidayExamine
            },
            {
              path: 'holidayTakeWork',
              name: 'holidayTakeWork',
              component: HolidayTakeWork
            },
            {
              path: 'holidayApply',
              name: 'holidayApply',
              component: HolidayApply
            },
            {
              path: 'holidaydetail/:id',
              name: 'holidaydetail',
              component: HolidayDetail
            },
            {
              path: 'statisticsholiday',
              name: 'statisticsholiday',
              component: StatisticsHoliday
            },
            {
              path: 'statisticsholidaydetail/:id',
              name: 'statisticsholidaydetail',
              component: StatisticsHolidayDetail
            },
            {
              path: 'punchOut',
              name: 'punchOut',
              component: punchOut
            },
            {
              path: 'onDuty',
              name: 'onDuty',
              component: onDuty
            },
            {
              path: 'setClock',
              name: 'setClock',
              component: setClock
            },
            {
              path: 'editor/:id',
              name: 'editor',
              component: editor,
              meta: {
                // requiresAuthen: false
              }
            }
          ]
        }]
      }, {
        path: 'file',
        name: 'file',
        component: file
      },
      {
        path:'HRmanagement',
        name: 'HRmanagement',
        component: HRmanagement,
        children: [{
          path: "userInfo",
          name: "userInfo",
          component: UserInfo
        },{
          path: "AddressManage",
          name: "AddressManage",
          component: AddressManage
        },{
          path: "CertificateManage",
          name: "CertificateManage",
          component: CertificateManage
        },
        {
          path: "DocumentManage",
          name: "DocumentManage",
          component: DocumentManage
        },
        {
          path: "BankManage",
          name: "BankManage",
          component: BankManage
        },
        {
          path: "EduManage",
          name: "EduManage",
          component: EduManage
        },
        {
          path: "WorkManage",
          name: "WorkManage",
          component: WorkManage
        },
        {
          path: "LinkmanManage",
          name: "LinkmanManage",
          component: LinkmanManage
        },
        {
          path: "SkillManage",
          name: "SkillManage",
          component: SkillManage
        }]
      },
      {
          path: "infopublish",
          name: "infopublish",
          component: infopublish,
          children:[
              {
                  path: 'noticeManager',
                  name: 'noticeManager',
                  component: noticeManager,
                  children:[
                      {
                          path: 'noticelist',
                          name: 'noticelist',
                          component: noticelist
                      },
                      {
                          path: 'noticepublish',
                          name: 'noticepublish',
                          component: noticepublish
                      },
                      {
                          path: 'noticeDetail/:id',
                          name: 'noticeDetail',
                          component: noticeDetail
                      },
                      {
                          path: 'mynotice',
                          name: 'mynotice',
                          component: mynotice
                      }
                  ]
              },
              {
                  path: 'afficheManager',
                  name: 'afficheManager',
                  component: afficheManager,
                  children:[
                      {
                          path: 'afficheList',
                          name: 'afficheList',
                          component: afficheList
                      },
                      {
                          path: 'afficheEditor',
                          name: 'afficheEditor',
                          component: afficheEditor
                      }
                      ,
                      {
                          path: 'afficheDetail',
                          name: 'afficheDetail',
                          component: afficheDetail
                      },
                      {
                          path: 'myaffiche',
                          name: 'myaffiche',
                          component: myaffiche
                      }
                  ]
              },
              {
                  path: 'messageHearder',
                  name: 'messageHearder',
                  component: afficheManager,
                  children:[
                      {
                          path: 'mymessage',
                          name: 'mymessage',
                          component: mymessage
                      }
                  ]
              }
          ]

      },
      { // 财务管理
        path: 'financialmanager',
        name: 'financialmanager',
        component: Submenu,
        children: [{
          path: 'costmanagement',
          name: 'costmanagement',
          component: costmanagement,
          children: [{
            path: 'borrow',
            name: 'borrow',
            component: borrow
          },{
            path: 'expenses',
            name: 'expenses',
            component: expenses
          },{
            path: 'account',
            name: 'account',
            component: account
          }]
        }]
      }
    ]
  }]
})
route.beforeEach((to, from, next) => {
    if(Object.keys(store.getters.baseData).length<1){
      let access_token=  sessionStorage.getItem('access_token');
      if(access_token){
        store.dispatch('GetBaseData').then(res=>{
            next()
        }).catch(err=>{
            next()
        })
      }
      else{
        next()
      }
    }
    else{
      next()
    }
})
export default route

// export default new Router({
//   mode: 'hash',
//   routes: [{
//     path: '/',
//     name: 'index',
//     redirect: 'index',
//     component: Layout,
//     meta: {
//       requiresAuthen: true
//     },
//     children: [
//       {
//         path: 'index',
//         component: Main,
//         meta: {
//           requiresAuthen: true
//         },
//       },
//       {
//         path: 'flowtest',
//         component: newflow
//       },
//       {
//         path: 'todoflow',
//         component: todoFlow
//       },
//       {
//         path: "ruanshili",
//         name: "ruanshili",
//         component: RuanShiLi,
//         children: [{
//             path: "rukuManager",
//             name: "rukuManager",
//             component: rukuManager,
//             children: [{
//                 path: "zizhirecords",
//                 name: "zizhirecords",
//                 component: ZiZhiRecords
//               },

//               {
//                 path: "device_appro",
//                 name: "device_appro",
//                 component: Device_appro
//               },

//               {
//                 path: "xinjianbaoxiudan",
//                 name: "xinjianbaoxiudan",
//                 component: xinjianbaoxiudan
//               },
//               {
//                 path: "xinjianbaofeidan",
//                 name: "xinjianbaofeidan",
//                 component: xinjianbaofeidan
//               },
//               {
//                 path: "xinjianzhuanyidan",
//                 name: "xinjianzhuanyidan",
//                 component: xinjianzhuanyidan
//               },
//               {
//                 path: "toShenPi",
//                 name: "toShenPi",
//                 component: ToShenPi
//               },
//               {
//                 path: "zichanDetail",
//                 name: "zichanDetail",
//                 component: zichanDetail
//               },
//               {
//                 path: "shebeishiyong",
//                 name: "shebeishiyong",
//                 component: Shebeishiyong
//               },
//               {
//                 path: "xinjianweibaodan",
//                 name: "xinjianweibaodan",
//                 component: xinjianweibaodan
//               },
//               {
//                 path: "renyuanshiyong",
//                 name: "renyuanshiyong",
//                 component: Renyuanshiyong
//               },
//               {
//                 path: "zichanpandian",
//                 name: "zichanpandian",
//                 component: zichanpandian
//               },
//               {
//                 path: "informationChange",
//                 name: "informationChange",
//                 component: informationChange
//               },
//               {
//                 path: "shebeiweixiu",
//                 name: "shebeiweixiu",
//                 component: Shebeiweixiu
//               },
//               {
//                 path: "shebeibaofei",
//                 name: "shebeibaofei",
//                 component: Shebeibaofei
//               },
//               {
//                 path: "RetApplication",
//                 name: "RetApplication",
//                 component: RetApplication
//               },
//               {
//                 path: "zhuanyiPage",
//                 name: "zhuanyiPage",
//                 component: zhuanyiPage
//               },
//               {
//                 path: "zichanqingdan",
//                 name: "zichanqingdan",
//                 component: zichanqingdan
//               },
//               {
//                 path: "Return_Step",
//                 name: "Return_Step",
//                 component: ReturnStep
//               },
//               {
//                 path: "device_return",
//                 name: "device_return",
//                 component: DeviceReturn
//               },
//               {
//                 path: "ReqApplication",
//                 name: "ReqApplication",
//                 component: ReqApplication
//               },
//               {
//                 path: "ApplyDetail",
//                 name: "ApplyDetail",
//                 component: ApplyDetail
//               },
//               {
//                 path: "Application",
//                 name: "Application",
//                 component: Application
//               },
//               {
//                 path: "device_Detail",
//                 name: "device_Detail",
//                 component: DeviceDetail
//               },
//               {
//                 path: "borrow_rec",
//                 name: "borrow_rec",
//                 component: Borrow_rec
//               },
//               {
//                 path: "zizhiTest",
//                 name: "zizhiTest",
//                 component: ZiZhiTest
//               },
//               {
//                 path: "assetCount",
//                 name: "assetCount",
//                 component: assetCount
//               },
//               {
//                 path: "zizhishenqing",
//                 name: "zizhishenqing",
//                 component: ZiZhiShenQing,
//                 meta: {
//                   requiresAuthen: false
//                 }
//               },
//             ]
//           },
//           {
//             path: 'CompanyQualification',
//             name: 'CompanyQualification',
//             component: CompanyQualification,
//             children: [{
//               path: 'CQNoData',
//               name: 'CQNoData',
//               component: CQNoData
//             }, {
//               path: 'AddCompanyQua',
//               name: 'AddCompanyQua',
//               component: AddCompanyQua
//             }, {
//               path: 'CompanyQuaTable',
//               name: 'CompanyQuaTable',
//               component: CompanyQuaTable
//             }, {
//               path: 'CompanyQuaDetail',
//               name: 'CompanyQuaDetail',
//               component: CompanyQuaDetail
//             }, {
//               path: 'CompanyQuaCheckOnce',
//               name: 'CompanyQuaCheckOnce',
//               component: CompanyQuaCheckOnce
//             }]
//           },
//           {
//             path: 'QualificationCount',
//             name: 'QualificationCount',
//             component: QualificationCount,
//             children: [{
//               path: 'QCIndex',
//               name: 'QCIndex',
//               component: QCIndex
//             }]
//           }, {
//             path: 'EmployeeQualification',
//             name: 'EmployeeQualification',
//             component: EmployeeQualification,
//             children: [{
//               path: 'EmployeeTable',
//               name: 'EmployeeTable',
//               component: EmployeeTable
//             }, {
//               path: 'AddEmployee',
//               name: 'AddEmployee',
//               component: AddEmployee
//             }, {
//               path: 'EmployeeDetail',
//               name: 'EmployeeDetail',
//               component: EmployeeDetail
//             }, {
//               path: 'EmployeeCheck',
//               name: 'EmployeeCheck',
//               component: EmployeeCheck
//             }]
//           }, {
//             path: 'GovermentQua',
//             name: 'GovermentQua',
//             component: GovermentQua,
//             children: [{
//               path: 'GoverQuaTable',
//               name: 'GoverQuaTable',
//               component: GoverQuaTable
//             }, {
//               path: 'AddGovQua',
//               name: 'AddGovQua',
//               component: AddGovQua
//             }, {
//               path: 'GovQuaDetail',
//               name: 'GovQuaDetail',
//               component: GovQuaDetail
//             }]
//           }, {
//             path: 'SystemSubmit',
//             name: 'SystemSubmit',
//             component: SystemSubmit,
//             children: [{
//               path: 'SysSubTable',
//               name: 'SysSubTable',
//               component: SysSubTable
//             }, {
//               path: 'AddSysSub',
//               name: 'AddSysSub',
//               component: AddSysSub
//             }, {
//               path: 'SysSubDetail',
//               name: 'SysSubDetail',
//               component: SysSubDetail
//             }]
//           }
//         ]
//       },
//       {
//         path: "projectManager",
//         name: "projectManager",
//         component: ProjectManager,
//         children: [{
//             path: "BasicSituation",
//             name: "BasicSituation",
//             component: ProjectHeader,
//             children: [{
//                 path: 'NoProject',
//                 name: "NoProject",
//                 component: Noproject
//               },
//               {
//                 path: 'ProjectList',
//                 name: 'ProjectList',
//                 component: ProjectList
//               },
//               {
//                 path: 'ProjectDetail',
//                 name: 'ProjectDetail',
//                 component: ProjectDetail
//               },
//               {
//                 path: 'AddProject',
//                 name: 'AddProject',
//                 component: AddProject
//               }
//             ]
//           },
//           {
//             path: "SystemManager",
//             name: "SystemManager",
//             component: ProjectHeader,
//             children: [{
//               path: "NoSysManager",
//               name: "NoSysManager",
//               component: NoSysManager
//             }]
//           }, {
//             path: "DeployEnvironment",
//             name: "DeployEnvironment",
//             component: ProjectHeader,
//             children: [{
//               path: "DENoData",
//               name: "DENoData",
//               component: DENoData
//             }]
//           }, {
//             path: "CodeProject",
//             name: "CodeProJect",
//             component: ProjectHeader,
//             children: [{
//               path: "CPNoData",
//               name: "CPNoData",
//               component: CPNoData
//             }]
//           }, {
//             path: "ApplicationProject",
//             name: "ApplicationProject",
//             component: ProjectHeader,
//             children: [{
//               path: "APNoData",
//               name: "APNoData",
//               component: APNoData,
//             }]
//           },
//           {
//             path: "ProjectTask",
//             name: "ProjectTask",
//             component: ProjectHeader,
//             children: [{
//               path: "PTNoData",
//               name: "PTNoData",
//               component: PTNoData
//             }]
//           }
//         ]
//       },
//       {
//         path: 'customManager',
//         name: 'customManager',
//         component: customManager,
//         children: [{
//             path: 'customrelationship',
//             name: 'customrelationship',
//             component: customManagerHeader,
//             children: [{
//               path: 'NoData',
//               name: 'CMNoData',
//               component: CMNoData
//             }, {
//               path: 'CustomTable',
//               name: 'CustomTable',
//               component: customTable
//             }, {
//               path: 'AddCustom',
//               name: 'AddCustom',
//               component: addCustom
//             }, {
//               path: 'CMDetailRevise',
//               name: 'CMDetailRevise',
//               component: CMDetailRevise
//             }]
//           }, {
//             path: 'Contacts',
//             name: 'Contacts',
//             component: Contacts,
//             children: [{
//               path: 'CNoData',
//               name: 'CNoData',
//               component: CNoData
//             }, {
//               path: 'ContactTable',
//               name: 'ContactTable',
//               component: ContactTable
//             }, {
//               path: 'AddContact',
//               name: 'AddContact',
//               component: AddContact
//             }, {
//               path: 'CDetailRevise',
//               name: 'CDetailRevise',
//               component: CDetailRevise
//             }]
//           },
//           {
//             path: 'BusinessChance',
//             name: 'BusinessChance',
//             component: BusinessChance,
//             children: [{
//               path: 'BCNoData',
//               name: 'BCNoData',
//               component: BCNoData
//             }, {
//               path: 'BCTable',
//               name: 'BCTable',
//               component: BCTable
//             }, {
//               path: 'AddBusinessChance',
//               name: 'AddBusinessChance',
//               component: AddBusinessChance
//             }, {
//               path: 'BCDetailRevise',
//               name: 'BCDetailRevise',
//               component: BCDetailRevise
//             }]
//           }, {
//             path: 'visit',
//             name: 'visit',
//             component: visit,
//             children: [{
//               path: 'VNoData',
//               name: 'VNoData',
//               component: VNoData
//             }, {
//               path: 'VisitTable',
//               name: 'VisitTable',
//               component: VisitTable
//             }, {
//               path: 'AddVisit',
//               name: 'AddVisit',
//               component: AddVisit
//             }, {
//               path: 'VDetailRevise',
//               name: 'VDetailRevise',
//               component: VDetailRevise
//             }]
//           }
//         ]
//       },
//       {
//         path: "checkingin",
//         name: "checkingin",
//         component: checkingIn,
//         children: [{
//           path: "conmponentheader",
//           name: "conmponentheader",
//           component: conmponentHeader,
//           children: [{
//               path: "work",
//               name: "work",
//               component: work,
//             },
//             {
//               path: "attendanceStatistics",
//               name: "attendanceStatistics",
//               component: attendanceStatistics,
//             },
//             {
//               path: "attendanceDetails/:id",
//               name: "attendanceDetails",
//               component: attendanceDetails,
//               meta: {
//                 // requiresAuthen: false
//               }
//             },
//             {
//               path: "subsidizedStatistics",
//               name: "subsidizedStatistics",
//               component: subsidizedStatistics,
//             },
//             {
//               path: "paidTime",
//               name: "paidTime",
//               component: paidTime,
//             },
//             {
//               path: "vacationStatistics",
//               name: "vacationStatistics",
//               component: vacationStatistics,
//             },
//             {
//               path: 'holidaystep',
//               name: 'holidaystep',
//               component: HolidayStep
//             },
//             {
//               path: 'holidayExamine',
//               name: 'holidayExamine',
//               component: HolidayExamine
//             },
//             {
//               path: 'holidayTakeWork',
//               name: 'holidayTakeWork',
//               component: HolidayTakeWork
//             },
//             {
//               path: 'holidayApply',
//               name: 'holidayApply',
//               component: HolidayApply
//             },
//             {
//               path: 'holidaydetail/:id',
//               name: 'holidaydetail',
//               component: HolidayDetail
//             },
//             {
//               path: 'statisticsholiday',
//               name: 'statisticsholiday',
//               component: StatisticsHoliday
//             },
//             {
//               path: 'statisticsholidaydetail/:id',
//               name: 'statisticsholidaydetail',
//               component: StatisticsHolidayDetail
//             },
//             {
//               path: 'punchOut',
//               name: 'punchOut',
//               component: punchOut
//             },
//             {
//               path: 'onDuty',
//               name: 'onDuty',
//               component: onDuty
//             },
//             {
//               path: 'setClock',
//               name: 'setClock',
//               component: setClock
//             },
//             {
//               path: 'editor/:id',
//               name: 'editor',
//               component: editor,
//               meta: {
//                 // requiresAuthen: false
//               }
//             }
//           ]
//         }]
//       }, {
//         path: 'file',
//         name: 'file',
//         component: file
//       },
//       {
//         path:'HRmanagement',
//         name: 'HRmanagement',
//         component: HRmanagement,
//         children: [{
//           path: "userInfo",
//           name: "userInfo",
//           component: UserInfo
//         },{
//           path: "AddressManage",
//           name: "AddressManage",
//           component: AddressManage
//         },{
//           path: "CertificateManage",
//           name: "CertificateManage",
//           component: CertificateManage
//         },
//         {
//           path: "DocumentManage",
//           name: "DocumentManage",
//           component: DocumentManage
//         },
//         {
//           path: "BankManage",
//           name: "BankManage",
//           component: BankManage
//         },
//         {
//           path: "EduManage",
//           name: "EduManage",
//           component: EduManage
//         },
//         {
//           path: "WorkManage",
//           name: "WorkManage",
//           component: WorkManage
//         },
//         {
//           path: "LinkmanManage",
//           name: "LinkmanManage",
//           component: LinkmanManage
//         },
//         {
//           path: "SkillManage",
//           name: "SkillManage",
//           component: SkillManage
//         }]
//       },
//       {
//           path: "infopublish",
//           name: "infopublish",
//           component: infopublish,
//           children:[
//               {
//                   path: 'noticeManager',
//                   name: 'noticeManager',
//                   component: noticeManager,
//                   children:[
//                       {
//                           path: 'noticelist',
//                           name: 'noticelist',
//                           component: noticelist
//                       },
//                       {
//                           path: 'noticepublish',
//                           name: 'noticepublish',
//                           component: noticepublish
//                       },
//                       {
//                           path: 'noticeDetail/:id',
//                           name: 'noticeDetail',
//                           component: noticeDetail
//                       },
//                       {
//                           path: 'mynotice',
//                           name: 'mynotice',
//                           component: mynotice
//                       }
//                   ]
//               },
//               {
//                   path: 'afficheManager',
//                   name: 'afficheManager',
//                   component: afficheManager,
//                   children:[
//                       {
//                           path: 'afficheList',
//                           name: 'afficheList',
//                           component: afficheList
//                       },
//                       {
//                           path: 'afficheEditor',
//                           name: 'afficheEditor',
//                           component: afficheEditor
//                       }
//                       ,
//                       {
//                           path: 'afficheDetail',
//                           name: 'afficheDetail',
//                           component: afficheDetail
//                       },
//                       {
//                           path: 'myaffiche',
//                           name: 'myaffiche',
//                           component: myaffiche
//                       }
//                   ]
//               },
//               {
//                   path: 'messageHearder',
//                   name: 'messageHearder',
//                   component: afficheManager,
//                   children:[
//                       {
//                           path: 'mymessage',
//                           name: 'mymessage',
//                           component: mymessage
//                       }
//                   ]
//               }
//           ]

//       }
//     ]
//   }]
// })