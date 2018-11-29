// 首页2
export const index2Tit = [{
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: 'IOServer名称',
        key: 'name1'
    },
    {
        title: '设备名称',
        key: 'name2'
    },
    {
        title: '设备描述',
        key: 'txt'
    },
    {
        title: '设备顺序号',
        key: 'number'
    }, {
        title: '设备状态',
        key: 'status'
    }, {
        title: '最后一次记录时间',
        key: 'time'
    }]
export const index2Data = [{
        name: '分组1',
        name1: 'IOServer1',
        name2: '设备1',
        txt: '描述一下设备',
        number: '0001',
        status: '正常',
        time: '2018-05-23 12:23:23'
}]
//首页1
export const index1Tit01 = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '服务类型',
        key: 'type'
    },
    {
        title: 'IP',
        key: 'ip'
    },
    {
        title: '报警信息',
        key: 'status',
        render: (h, params) => {
            const row = params.row;
            const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
            const text = row.status === 1 ? '正常' : row.status === 2 ? '正常' : '离线';

            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        }
    },
    {
        title: '报警时间',
        key: 'time1'
    }
    ]
export const index1Data01 = [{
    type: '物联网接口服务',
    ip: '193.221.021.212:99999',
    status: '1',
    time1: '2018-05-28:13:32:21'
}]

export const index1Tit02 = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '物联网接口',
        key: 'interface'
    },
    {
        title: 'IOServer名称',
        key: 'name1'
    },
    {
        title: '设备名称',
        key: 'name2'
    },
    {
        title: '设备ID',
        key: 'Deviceid'
    },
    {
        title: '报警信息',
        key: 'status',
        render: (h, params) => {
            const row = params.row;
            const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
            const text = row.status === 1 ? '正常' : row.status === 2 ? '正常' : '离线';

            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        }
    },
    {
        title: '报警时间',
        key: 'time2'
    }
    ]
export const index1Data02 = [{
    interface: '物联网接口服务1',
    name: '分组2',
    name1: 'IOServer1', 
    name2: '温度探测器1',
    Deviceid: '001',
    status: '1',
    time2: '2018-05-28:13:32:32'
}]
//物联网接口管理
export const InternetTit = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '物联网接口名称',
        key: 'name'
    },
    {
        title: '物联网接口服务的描述',
        key: 'txt'
    },
    {
        title: '状态',
        key: 'status'
    },
    {
        title: '最后一次操作时间',
        key: 'time'
    },
    {
        title: '操作人',
        key: 'Operationof'
    },
    {
        title: '操作',
        key: 'Operation',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                    type: 'primary',
                    size: 'small'
                    },
                    style: {
                    marginRight: '5px'
                    },
                    on: {
                    click: () => {
                    this.show(params.index)
                    }
                }
                }, '修改'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                    }, '删除 ')
                ]);
            }
        }
    ]
export const InternetData = [{
    name: '物联网接口1',
    txt: '描述',
    IP: '192.136.2.3', 
    time: '2018-05-23 12:23:23',
    Operationof: 'admin'
},{
    name: '物联网接口2',
    txt: '描述',
    IP: '192.136.2.4', 
    time: '2018-05-23 12:23:23',
    Operationof: 'admin'
},{
    name: '物联网接口3',
    txt: '描述',
    IP: '192.136.2.4', 
    time: '2018-05-23 12:23:23',
    Operationof: 'admin'
}]
//控制接口管理
export const controlTit = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '控制接口服务名称',
        key: 'name'
    },
    {
        title: '对应的物联网接口服务名称',
        key: 'name1'
    },
    {
        title: '描述',
        key: 'txt'
    },
    {
        title: 'ID',
        key: 'id'
    },
    {
        title: '设备状态',
        key: 'status'
    },
    {
        title: '最后一次记录时间',
        key: 'time'
    },
    {
        title: '操作',
        key: 'Operation',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                    type: 'primary',
                    size: 'small'
                    },
                    style: {
                    marginRight: '5px'
                    },
                    on: {
                    click: () => {
                    this.show(params.index)
                    }
                }
                }, '配置'),
                h('Button', {
                    props: {
                    type: 'error',
                    size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                    }, '详情')
                ]);
            }
        }
    ]
export const controlData = [{
    name: '控制接口服务',
    name1: '物联网接口服务名称',
    txt: '描述一下设备', 
    id: '0001',
    IP: '192.168.2.3',
    time: '2018-05-23 12:23:23'
}, {
    name: '控制接口服务2',
    name1: '物联网接口服务名称2',
    txt: '描述一下设备', 
    id: '0001',
    IP: '192.168.2.9',
    time: '2018-05-23 12:23:23'
}, {
    name: '控制接口服务4',
    name1: '物联网接口服务名称2',
    txt: '描述一下设备', 
    id: '0001',
    IP: '192.168.2.7',
    time: '2018-05-23 12:23:23'
}, {
    name: '控制接口服务5',
    name1: '物联网接口服务名称2',
    txt: '描述一下设备', 
    id: '0001',
    IP: '192.168.2.8',
    time: '2018-05-23 12:23:23'
}]
//分发接口管理
export const distributionTit = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '分发接口服务名称',
        key: 'name'
    },
    {
        title: 'ID',
        key: 'id'
    },
    {
        title: '描述',
        key: 'txt'
    },
    {
        title: '下发分发配置',
        key: 'distribution'
    },
    {
        title: 'IP',
        key: 'IP'
    },
    {
        title: '最后一次记录时间',
        key: 'time'
    },
    {
        title: '操作',
        key: 'Operation',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                    type: 'primary',
                    size: 'small'
                    },
                    style: {
                    marginRight: '5px'
                    },
                    on: {
                    click: () => {
                    this.show(params.index)
                    }
                }
                }, '配置'),
                h('Button', {
                    props: {
                    type: 'error',
                    size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                    }, '详情')
                ]);
            }
        }
    ]
export const distributionData = [{
    name: '分发接口服务1',
    id: '0001',
    txt: '描述一下', 
    distribution: '已经下发',
    IP: '192.168.3.12',
    time: '2018-05-23 12:23:23'
}, {
    name: '分发接口服务2',
    id: '0001',
    txt: '描述一下', 
    distribution: '已经下发',
    IP: '192.168.3.1',
    time: '2018-05-23 12:23:23'
}, {
    name: '分发接口服务3',
    id: '0001',
    txt: '描述一下', 
    distribution: '已经下发',
    IP: '192.168.3.6',
    time: '2018-05-23 12:23:23'
}]
//用户管理
export const userTit = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '账号',
        key: 'account'
    },
    {
        title: '密码',
        key: 'pwd'
    },
    {
        title: '用户名称',
        key: 'name'
    },
    {
        title: '手机号',
        key: 'iphone'
    },
    {
        title: 'IOServer管辖范围',
        key: 'scope'
    },
    {
        title: '状态',
        key: 'status'
    },
    {
        title: '操作',
        key: 'Operation',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                    type: 'primary',
                    size: 'small'
                    },
                    style: {
                    marginRight: '5px'
                    },
                    on: {
                    click: () => {
                    this.show(params.index)
                    }
                }
                }, '修改'),
                h('Button', {
                    props: {
                    type: 'error',
                    size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                    }, '删除 ')
                ]);
            }
        }
    ]
export const userData = [{
    account: 'zhangsan_01',
    pwd: 'abc123',
    name: '张三1', 
    iphone: '13111223341',
    scope: 'IOServer1、IOServer2',
    status: '启用'
}, {
    account: 'zhangsan_02',
    pwd: 'abc123',
    name: '张三2', 
    iphone: '13111223341',
    scope: 'IOServer1、IOServer2',
    status: '启用'
}, {
    account: 'zhangsan_03',
    pwd: 'abc123',
    name: '张三3', 
    iphone: '13111223341',
    scope: 'IOServer1、IOServer2',
    status: '启用'
}, {
    account: 'zhangsan_04',
    pwd: 'abc123',
    name: '张三4', 
    iphone: '13111223341',
    scope: 'IOServer1、IOServer2',
    status: '启用'
}, {
    account: 'zhangsan_05',
    pwd: 'abc123',
    name: '张三5', 
    iphone: '13111223341',
    scope: 'IOServer1、IOServer2',
    status: '启用'
}, {
    account: 'zhangsan_06',
    pwd: 'abc123',
    name: '张三6', 
    iphone: '13111223341',
    scope: 'IOServer1、IOServer2',
    status: '启用'
}]
//角色管理
export const roleTit = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '角色名称',
        key: 'name'
    },
    {
        title: '备注信息',
        key: 'info'
    },
    {
        title: '创建时间',
        key: 'time'
    },
    {
        title: '状态',
        key: 'status'
    },
    {
        title: '操作',
        key: 'Operation',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                    type: 'primary',
                    size: 'small'
                    },
                    style: {
                    marginRight: '5px'
                    },
                    on: {
                    click: () => {
                        this.$router.push({
                            name: 'role-add',
                            query: {
                                type: 'upd'
                            }
                        })
                    }
                }
                }, '修改'),
                h('Button', {
                    props: {
                    type: 'error',
                    size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                    }, '删除 ')
                ]);
            }
        }
    ]
export const roleData = [{
    name: '超级管理员',
    info: '13111223341',
    time: '2018-05-14 13:03:23',
    status: '启用'
},{
    name: '普通管理员',
    info: '13111223341',
    time: '2018-05-14 13:03:23',
    status: '启用'
}] 
//日志管理
export const logTit = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '日志名称',
        key: 'name'
    },
    {
        title: '所属服务',
        key: 'service'
    },
    {
        title: 'IP',
        key: 'ip'
    },
    {
        title: '日志级别',
        key: 'level'
    },
    {
        title: '产生的日期',
        key: 'date'
    },
    {
        title: '操作',
        key: 'Operation',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                    type: 'primary',
                    size: 'small'
                    },
                    style: {
                    marginRight: '5px'
                    },
                    on: {
                    click: () => {
                    this.show(params.index)
                    }
                }
                }, '查看')
                ]);
            }
        }
    ]
export const logData = [{
    name: 'LOG_WLWJK_20180515_1.log',
    service: '物联网接口服务',
    ip: '192.122.32.22',
    level: 'DEBUG',
    date: '2018-05-15 00:00:00'
},{
    name: 'LOG_WLWJK_20180515_2.log',
    service: '物联网接口服务',
    ip: '192.122.32.22',
    level: 'DEBUG',
    date: '2018-05-15 00:00:00'
},{
    name: 'LOG_WLWJK_20180515_3.log',
    service: '物联网接口服务',
    ip: '192.122.32.22',
    level: 'DEBUG',
    date: '2018-05-15 00:00:00'
},{
    name: 'LOG_WLWJK_20180515_4.log',
    service: '物联网接口服务',
    ip: '192.122.32.22',
    level: 'DEBUG',
    date: '2018-05-15 00:00:00'
}]
//分发接口管理详情
export const distributiondetailsTit = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
    },
    {
        title: '物联网接口名称',
        key: 'name'
    },
    {
        title: 'IOServer名称',
        key: 'name1'
    },
    {
        title: '类型',
        key: 'type'
    },
    {
        title: '设备或数据包名称',
        key: 'name2'
    },
    {
        title: '变量名称',
        key: 'variablename'
    },
    {
        title: '变量值',
        key: 'variablevalue'
    },
    {
        title: '采集时间',
        key: 'time'
    }
    ]
export const distributiondetailsData = [{
    name: '物联网接口名称1',
    name1: 'IOServer1',
    type: '数据包',
    name2: '数据包1',
    variablename: '变量1',
    variablevalue: '12.22',
    time: '2018-05-23 12:23:23'
}]
