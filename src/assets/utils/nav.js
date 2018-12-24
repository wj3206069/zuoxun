var navjson = {
    //行政管理
    administrative_management: {
        information_resources: [],
        company_system: [{
                id: "1",
                label: "制度编写",
                path: {
                    name: ""
                }
            },
            {
                id: "2",
                label: "制度审批",
                path: {
                    name: ""
                }
            },
            {
                id: "3",
                label: "制度发布",
                path: {
                    name: ""
                }
            },
            {
                id: "4",
                label: "制度汇编",
                children: [{
                        id: "4-1",
                        label: "考勤制度"
                    },
                    {
                        id: "4-2",
                        label: "财务制度"
                    },
                    {
                        id: "4-3",
                        label: "子主题 3"
                    },
                    {
                        id: "4-4",
                        label: "子主题 4"
                    }
                ]
            },
        ],
        ruanshili: [{
                id: "1",
                label: "资质",
                children: [{
                        id: "1-1",
                        label: "资质统计",
                        path: {
                            name: 'QCIndex'
                        }
                    },
                    {
                        id: "1-2",
                        label: "公司资质",
                        path: {
                            name: 'CompanyQuaTable'
                        }
                    },
                    {
                        id: "1-3",
                        label: "员工资质",
                        path: {
                            name: 'EmployeeTable'
                        }
                    },
                    {
                        id: "1-4",
                        label: "政府资助",
                        path: {
                            name: 'GoverQuaTable'
                        }
                    },
                    {
                        id: "1-5",
                        label: "政府系统填报",
                        path: {
                            name: "SysSubTable"
                        }
                    }
                ]
            },
            {
                id: "2",
                label: "人员资质",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "知识产权",
                children: [{
                        id: "3-1",
                        label: "著作权"
                    },
                    {
                        id: "3-2",
                        label: "商标"
                    },
                    {
                        id: "3-3",
                        label: "专利"
                    },
                    {
                        id: "3-4",
                        label: "产品证书"
                    }
                ]
            },
            {
                id: "4",
                label: "测试报告",
                children: [{
                        id: "4-1",
                        label: "项目测试报告"
                    },
                    {
                        id: "4-2",
                        label: "产品测试报告"
                    },
                ]
            },
        ],
        government_funding: [{
                id: "1",
                label: "资助政策",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "资助申请",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        documents_approved: [{
                id: "1",
                label: "印章管理",
                children: [{
                        id: "3-1",
                        label: "申请"
                    },
                    {
                        id: "3-2",
                        label: "批准"
                    },
                ]
            },
            {
                id: "2",
                label: "其他业务",
                children: [{
                        id: "3-1",
                        label: "申请"
                    },
                    {
                        id: "3-2",
                        label: "批准"
                    },
                ]
            },
        ],
        fixed_assets: [{
                id: "0",
                label: "资产使用情况",
                path: {
                    name: "assetCount"
                }
            },
            {
                id: "1",
                label: "资产入库",
                path: {
                    name: "zizhiTest"
                }
            },
            {
                id: "2",
                label: "领用申请",
                path: {
                    name: "Application"
                }
            },
            {
                id: "3",
                label: "归还申请",
                path: {
                    name: "device_return"
                }
            },

            {
                id: "4",
                label: "资产维修",
                path: {
                    name: "shebeiweixiu"
                }
            },
            {
                id: "5",
                label: "资产转移",
                path: {
                    name: "shebeishiyong"
                }
            },
            {
                id: "6",
                label: "资产报废",
                path: {
                    name: "shebeibaofei"
                }
            },
            {
                id: "7",
                label: "信息变更",
                path: {
                    name: "renyuanshiyong"
                }
            },
            {
                id: "8",
                label: "业务审核",
                path: {
                    name: "device_appro"
                }
            },
            {
                id: "9",
                label: "资产盘点",
                path: {
                    name: "zichanpandian"
                }
            },
            {
                id: "10",
                label: "资产清单",
                path: {
                    name: "zichanqingdan"
                }
            },
        ]
    },
    //人事管理
    personnel_management: {
        recruitment_management: [{
                id: "1",
                label: "招聘计划",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "面试通知",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "录用通知",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        entry_management: [{
                id: "1",
                label: "入职登记",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "员工信息",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        correction_management: [{
                id: "1",
                label: "申请",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "审核",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        quit_management: [{
                id: "1",
                label: "申请离职",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "申请开除",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "非正常离职申请",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "4",
                label: "离职审核",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "5",
                label: "工作交接",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "6",
                label: "离职人员信息",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        attendance_management: [{
                id: "1",
                label: "考勤规则",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "打卡记录",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "外出记录",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "4",
                label: "调休处理",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        leave_management: [{
                id: "1",
                label: "请假申请",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "请假审批",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "请假记录",
                path: {
                    name: "zizhirecords"
                }
            },
        ]
    },
    //财务管理
    financial_management: {
        personnel_information: [{
                id: "1",
                label: "员工花名册",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "入职人员",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "转正人员",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "4",
                label: "离职人员",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "5",
                label: "考勤情况",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        meal_supplement: [],
        loan_management: [{
                id: "1",
                label: "借款申请",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "借款审核",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "借款信息",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        expense: [{
                id: "1",
                label: "开支申请",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "开支审核",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "开支审查",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "4",
                label: "开支信息",
                path: {
                    name: "zizhirecords"
                }
            },
        ],
        reimburse_management: [{
                id: "1",
                label: "报销申请",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "2",
                label: "报销登记",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "3",
                label: "报销信息",
                path: {
                    name: "zizhirecords"
                }
            },
            {
                id: "4",
                label: "报销统计",
                path: {
                    name: "zizhirecords"
                }
            },
        ]
    },
    //合同管理
    contract_management: {
        contract_template: [],
        contract_preparation: [],
        contract_registration: [],
        contract_execution: [],
    }
}

export default navjson;