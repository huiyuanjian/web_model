
<template>
    <div class="warp-main">
        <Card>
            <h4 class="title-h4"  slot="title">
                <Icon type="ios-paper-outline"></Icon> 同步数据
            </h4>
            <Row>
                <Col span="6" >
                    <Card style="width:calc(100% - 15px);height: 800px;">
                        <p slot="title">
                            采集分组
                        </p>
                        <Row style="margin-bottom: 10px;">
                            <Col span="24">
                                <Input v-model="search.tree_name" icon="search" placeholder="输入关键字" style="width: 100%" />
                            </Col>
                        </Row>
                        <Row style="margin-bottom: 10px;">
                            <Col span="24">
                                <my-tree 
                                :list="tree.treeList" 
                                :isRightAction="true" 
                                :parentAction="tree.parentAction" 
                                :childAction="tree.childAction" 
                                :form='modalForm'
                                :modalFormValidate='modalFormValidate'
                                @fun='synchroData'
                                @clickFun='synchroData'></my-tree>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span="18">
                    <Card style="width:calc(100% - 15px);margin-left: 7px;">
                        <p slot="title">
                           设备详情
                        </p>
                        <div v-if="synchro_loading" style="position:absolute;width: 98%;height: calc(100% - 70px);">
                            <Spin fix>
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>正在同步，请稍等。。。</div>
                            </Spin>
                        </div>
                        <Row style="margin-bottom: 10px;">
                            <Col span="6">
                                <Input icon="search" placeholder="设备名称" style="width: 100%" />
                            </Col>
                            <!-- <Col span="18" style="text-align: right">
                                <Button type="primary" size="large" >全量启用</Button>
                                <Button type="primary" size="large" >全量停用</Button>
                                <Button type="primary" size="large" >启用</Button>
                                <Button type="primary" size="large" >停用</Button>
                            </Col> -->
                        </Row>
                        <Row style="margin-bottom: 10px;">
                            <Col span="24"  class="mm-box">
                                <Table border :columns="InternetTit" :data="InternetData" height="663"></Table>
                                <!-- <Page class="page-position" :current="page.pageIndex" :total="page.totalItemCount" show-total :page-size='page.pageSize'></Page> -->
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import myTree from '../main-components/tree/my-tree.vue';
import expandRow from '../main-components/table/table-expand.vue';

export default {
    components: {
        myTree,
        expandRow
    },
    name: '',
    data () {
        return {
            renderTable: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '变量名称',
                    key: 'variableName'
                }, 
                // {
                //     title: '顺序号',
                //     key: 'SN'
                // }, {
                //     title: 'ID',
                //     key: 'ID'
                // }, 
                {
                    title: '变量描述',
                    key: 'variableDescribe',
                    renderHeader: (h, column, index) => {
                        return h('span', {
                            style: {
                                marginLeft: '18px'
                            }
                        }, '变量描述');
                    },
                    render:  (h, params) => {
                        return h('span', {
                            style: {
                                marginLeft: '18px'
                            }
                        }, params.row.variableDescribe);
                    },
                }
            ],
            InternetData: [],
            InternetTit: [
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
                {
                    title: '设备ID',
                    key: 'deviceId',
                    width: 100
                },
                {
                    title: '设备名称',
                    key: 'deviceName',
                    width: 200
                },
                {
                    title: '采集周期(秒)',
                    key: 'acquisitionCycle',
                    width: 120
                },
                {
                    title: '变量信息',
                    align: 'center',
                    key: 'list',
                    renderHeader: (h, column, index) => {
                        console.log(column)
                        return h('Table', {
                            class: 'xrTable',
                            props: {
                                columns: this.renderTable
                            }
                        });
                    },
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
               
            ],
            page: {
                pageIndex: 1,
                totalItemCount: 100,
                pageSize: 50
            },
            tree: {
                parentAction: [
                    {title:'添加Ioserver',registerFuntion: 'addObj'}
                ],
                childAction: [
                    {
                        title: '同步设备和变量',
                        registerFuntion: 'fun'
                    },
                    {
                        title: '修改',
                        registerFuntion: 'updObj'
                    },
                    {
                        title: '删除',
                        registerFuntion: 'delObj'
                    }
                ],
                treeList: [
                    {
                        id: 1,
                        parentID: 0,
                        title: '物联网接口1',
                        isSelected: true,
                        isActionShow: false,
                        isHover: false,
                        children: [
                            {
                                id: 10001,
                                parentID: 1,
                                title: 'IOServer1',
                                isSelected: false,
                                isActionShow: false,
                                isHover: false
                            },
                            {
                                id: 10002,
                                parentID: 1,
                                title: 'IOServer1',
                                isSelected: false,
                                isActionShow: false,
                                isHover: false
                            }
                        ]
                    },  {
                        id: 2,
                        parentID: 0,
                        title: '物联网接口2',
                        isSelected: false,
                        isActionShow: false,
                        isHover: false,
                        children: [
                            {
                                id: 20001,
                                parentID: 2,
                                title: 'IOServer21',
                                isSelected: false,
                                isActionShow: false,
                                isHover: false
                            },
                            {
                                id: 20002,
                                parentID: 2,
                                title: 'IOServer21',
                                isSelected: false,
                                isActionShow: false,
                                isHover: false
                            }
                        ]
                    }
                ]
            },
            search: {
                tree_name: ''
            },
            modalForm: [
                {
                    name: 'IOServer名称',
                    key: 'name',
                    classParent: 'form-row',
                    inputType: 'text'
                }, {
                    name: 'IP和端口号',
                    key: 'ipAndPost',
                    classParent: 'form-row-inputs',
                    inputType: 'text',
                }, {
                    name: '采集周期',
                    key: 'acquisitionCycle',
                    classParent: 'form-row',
                    inputType: 'text'
                }, {
                    name: '描述',
                    key: 'describe',
                    classParent: 'form-row',
                    inputType: 'textarea',
                    limits: {minRows: 2,maxRows: 5}
                }
            ],
            modalFormValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                ipAndPost: [
                    { required: true, message: '请输入Ip和端口号', trigger: 'blur' }
                ],
                acquisitionCycle: [
                    { required: true, message: '请输入采集周期', trigger: 'blur'}
                ]
            },
            synchro_loading: false
        };
    },
    mounted () {
        let larr = []
        for (let i = 1; i < 10; i++) {
            let child = []
            for (let j = 1; j < 5; j++) {
                let one =  {
                        deviceId: i + '0000' + j,
                        deviceName: '设备' + i + j,
                        variableName: '变量' + i + j,
                        variableDescribe: '变量' + i + j + '描述',
                        SN: 10 + i + j,
                        ID: 20 + i + j,
                        mapVariable: 20 + i + j
                    }
                child.push(one)
            }
            let item = {
                deviceId: i + '0000' + i,
                deviceName: '设备' + i,
                acquisitionCycle: 20 + i,
                list: {
                    tit: this.renderTable,
                    data:  child
                }
            }
            larr.push(item)
        }
        this.InternetData = larr
    },
    methods: {
        synchroData (data) {
            this.synchro_loading = true
            setTimeout(() => {
                this.synchro_loading = false
            }, 1000)
        }
    }
};
</script>

