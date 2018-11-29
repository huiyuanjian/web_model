<style lang="less" scoped>
    .row-box{
        &-card{
            height: 600px;
            &-loading{
                position:absolute;
                width: 95%;
                height: 80%;
            }
            .ivu-row{
                margin-bottom: 10px;
            }
        }
    }
</style>

<template>
    <div class="warp-main">
        <Card>
            <Row class="row-box" :gutter="15">
                <Col span="6" >
                    <Card style="width:calc(100% - 15px);height: 800px;">
                        <p slot="title">
                            模型分组
                        </p>
                        <Row>
                            <Col span="24">
                                <Input v-model="search.tree_name" icon="search" placeholder="输入关键字" style="width: 100%" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                <my-tree 
                                :list="tree.treeList" 
                                @clickFun='synchroData'></my-tree>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span="18">
                    <Card class="row-box-card" style="height: auto">
                        <p slot="title">
                           设备详情
                        </p>
                        <div class="row-box-card-loading" v-if="synchro_loading"  style="position:absolute;width: 98%;height: calc(100% - 70px);">
                            <Spin fix>
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载中，请稍等。。。</div>
                            </Spin>
                        </div>
                        <Row>
                            <Col span="24">
                                 <Input icon="search" placeholder="设备名称" style="width: 200px;max-width: 100%" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24" class="mm-box">
                                <Table border :columns="InternetTit" :data="InternetData" height="663"></Table>
                                <!-- <Page class="page-position" :current="page.pageIndex" :total="page.totalItemCount" show-total :page-size='page.pageSize'></Page> -->
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
        <Modal class="modal-foo-cancel" v-model="showModal"  :width="900">
            <h3 slot="header" class="modal-tit" v-html="modal.modalTitle"></h3>
            <!-- <Row :gutter="15"> -->
                <!-- <Col span="6" >
                    <Card class="row-box-card">
                        <p slot="title">
                            采集分组
                        </p>
                        <Row>
                            <Col span="24">
                                <Input v-model="search.tree_name" icon="search" placeholder="输入关键字" style="width: 100%" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                <my-tree 
                                :list="tree.modalTreeList" 
                                @clickFun='modalSynchroData'></my-tree>
                            </Col>
                        </Row>
                    </Card>
                </Col> -->
                <!-- <Col span="24"> -->
                    <!-- <Card class="row-box-card" style="height: auto"> -->
                        <!-- <p slot="title">
                           设备详情
                        </p> -->
                        <!-- <div v-if="modal.synchro_loading" style="position:absolute;width: 98%;height: calc(100% - 70px);">
                            <Spin fix>
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载中，请稍等。。。</div>
                            </Spin>
                        </div> -->
                        <Row>
                             <Col span="24"  style="margin-bottom: 10px;">
                                 <Input icon="search" placeholder="设备名称" style="width: 200px;max-width: 100%;"/>
                            </Col>
                            <Col span="24" class="mm-box">
                                <Table border :columns="modalTit" :data="modalData" height="460"></Table>
                                <!-- <Page class="page-position" :current="page.pageIndex" :total="page.totalItemCount" show-total :page-size='page.pageSize'></Page> -->
                            </Col>
                        </Row>
                    <!-- </Card> -->
                <!-- </Col> -->
            <!-- </Row> -->
            <div slot="footer" style="display：none;">
                <!-- <Button type="primary" :loading="modal.saveModalLoading" @click="saveModel">确定</Button> -->
                <!-- <Button type="text" @click="showModal = false">取消</Button> -->
            </div>
        </Modal>
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
            specialObj: {},
            showModal: false,
            modal: {
                modalTitle: '',
                saveModalLoading: false,
                synchro_loading: false
            },
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
                }, {
                    title: '映射采集变量',
                    key: 'mapVariable'
                }, {
                    title: '变量描述',
                    key: 'variableDescribe'
                }, {
                    title: '操作',
                    key: 'Action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: params.row.mapVariable === '' ? 'primary' : 'default',
                                    size: 'small'
                                },
                                style: {
                                    textAlign: 'center'
                                },
                                on: {
                                click: () => {
                                    console.log(params.row)
                                    if (params.row.mapVariable === '') {
                                        this.modal.modalTitle = params.row.deviceName + '-' + params.row.variableName
                                        this.specialObj = params
                                        this.showModal = true
                                    } else {
                                        this.$Modal.confirm({
                                            title: '操作提示',
                                            content: '您确定要解绑吗',
                                            onOk: () => {
                                                params.row.mapVariable = ''
                                            },
                                            onCancel: () => {
                                            }
                                        });
                                    }
                                }
                            }
                            }, params.row.mapVariable === '' ? '绑定' : '解绑')
                        ]);
                    }
                }
            ],
            renderModalTable:  [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '变量名称',
                    key: 'variableName',
                    width: 200
                }, 
                // {
                //     title: '顺序号',
                //     key: 'SN'
                // }, {
                //     title: 'ID',
                //     key: 'ID'
                // }, 
                // {
                //     title: '变量描述',
                //     key: 'variableDescribe'
                // },
                {
                    title: '操作',
                    key: 'Action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    textAlign: 'center'
                                },
                                on: {
                                click: () => {
                                   this.saveModel(params)
                                }
                            }
                            }, '绑定')
                        ]);
                    }
                }
            ],
            InternetData: [],
            InternetTit: [
                // {
                //     title: '设备ID',
                //     key: 'deviceId',
                //     width: 100
                // },
                {
                    title: '设备名称',
                    key: 'deviceName',
                    width: 200
                },
                {
                    title: '采集周期(秒)',
                    key: 'acquisitionCycle',
                    width: 110
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
            modalTit: [
                {
                    title: 'IOServer名称',
                    key: 'deviceId',
                    width: 150
                },
                // {
                //     title: '设备ID',
                //     key: 'deviceId',
                //     width: 100
                // },
                {
                    title: '设备名称',
                    key: 'deviceName',
                    width: 150
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
                                columns: this.renderModalTable
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
            modalData: [],
            page: {
                pageIndex: 1,
                totalItemCount: 100,
                pageSize: 50
            },
            tree: {
                treeList: [
                    {
                        id: 1,
                        parentID: 0,
                        title: '安溪华工厂',
                        isSelected: true,
                        isActionShow: false,
                        isHover: false,
                        children: [
                            {
                                id: 10001,
                                parentID: 1,
                                title: '污水处理区1',
                                isSelected: false,
                                isActionShow: false,
                                isHover: false,
                                children: [
                                    {
                                        id: 1000111,
                                        parentID: 10001,
                                        title: '转速组1',
                                        isSelected: false,
                                        isActionShow: false,
                                        isHover: false
                                    },
                                    {
                                        id: 1000111,
                                        parentID: 10001,
                                        title: '转速组2',
                                        isSelected: false,
                                        isActionShow: false,
                                        isHover: false
                                    }
                                ]
                            },
                            {
                                id: 10002,
                                parentID: 1,
                                title: '污水处理区2',
                                isSelected: false,
                                isActionShow: false,
                                isHover: false
                            }
                        ]
                    },  {
                        id: 2,
                        parentID: 0,
                        title: '安溪华工村',
                        isSelected: false,
                        isActionShow: false,
                        isHover: false,
                        children: [
                            {
                                id: 20001,
                                parentID: 2,
                                title: '污水处理区3',
                                isSelected: false,
                                isActionShow: false,
                                isHover: false
                            },
                            {
                                id: 20002,
                                parentID: 2,
                                title: '污水处理区4',
                                isSelected: false,
                                isActionShow: false,
                                isHover: false
                            }
                        ]
                    }
                ],
                modalTreeList: [
                    {
                        id: 1,
                        parentID: 0,
                        title: '物联网接口1',
                        isSelected: true,
                        isActionShow: true,
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
            synchro_loading: false
        };
    },
    mounted () {
        let larr = []
        let larr1 = []
        for (let i = 1; i < 10; i++) {
            let child = []
            for (let j = 1; j < 5; j++) {
                let one =  {
                        deviceId:  'IOServer' + i,
                        deviceName: '设备' + i,
                        variableName: '变量' + i + j,
                        variableDescribe: '变量' + i + j + '描述',
                        SN: 10 + i + j,
                        ID: 20 + i + j,
                        mapVariable: j % 2 === 0 ? '' : 20 + i + j
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
            let item1 = {
                deviceId:  'IOServer' + i,
                deviceName: '设备' + i,
                acquisitionCycle: 20 + i,
                list: {
                    tit: this.renderModalTable,
                    data:  child
                }
            }
            larr.push(item)
            larr1.push(item1)
        }
        this.InternetData = larr
        this.modalData = larr1
        // this.InternetData =  [
        //     {
        //         deviceId: 100001,
        //         deviceName: '设备1',
        //         acquisitionCycle: 20,
        //         list: {
        //             tit: this.renderTable,
        //             data:  [
        //                 {
        //                     deviceId: 100001,
        //                     deviceName: '设备1',
        //                     variableName: '变量11',
        //                     variableDescribe: 2,
        //                     mapVariable: 1222
        //                 },
        //                 {
        //                     deviceId: 100001,
        //                     deviceName: '设备1',
        //                     variableName: '变量12',
        //                     variableDescribe: 2,
        //                     mapVariable: '变量11'
        //                 },
        //                 {
        //                     deviceId: 100001,
        //                     deviceName: '设备1',
        //                     variableName: '变量12',
        //                     variableDescribe: 2,
        //                     mapVariable: ''
        //                 }
        //             ]
        //         }
        //     },{
        //         deviceId: 100002,
        //         deviceName: '设备2',
        //         acquisitionCycle: 20,
        //         list: {
        //             tit: this.renderTable,
        //             data:  [
        //                 {
        //                     deviceId: 100002,
        //                     deviceName: '设备2',
        //                     variableName: '变量21',
        //                     variableDescribe: 2,
        //                     mapVariable: 1222
        //                 },
        //                 {
        //                     deviceId: 100002,
        //                     deviceName: '设备2',
        //                     variableName: '变量22',
        //                     variableDescribe: 2,
        //                     mapVariable: 1222
        //                 }
        //             ]
        //         }
        //     }
        // ];
        // this.modalData =  [
        //     {
        //         deviceId: 100001,
        //         deviceName: '设备1',
        //         acquisitionCycle: 20,
        //         list: {
        //             tit: this.renderModalTable,
        //             data:  [
        //                 {
        //                     deviceId: 100001,
        //                     deviceName: '设备1',
        //                     variableName: '变量11',
        //                     SN: 1,
        //                     ID: 1,
        //                     variableDescribe: 2,
        //                     mapVariable: 1222
        //                 },
        //                 {
        //                     deviceId: 100001,
        //                     deviceName: '设备1',
        //                     variableName: '变量12',
        //                     variableDescribe: 2,
        //                     SN: 1,
        //                     ID: 1,
        //                     mapVariable: '变量11'
        //                 },
        //                 {
        //                     deviceId: 100001,
        //                     deviceName: '设备1',
        //                     variableName: '变量12',
        //                     SN: 1,
        //                     ID: 1,
        //                     variableDescribe: 2,
        //                     mapVariable: ''
        //                 }
        //             ]
        //         }
        //     },{
        //         deviceId: 100002,
        //         deviceName: '设备2',
        //         acquisitionCycle: 20,
        //         list: {
        //             tit: this.renderModalTable,
        //             data:  [
        //                 {
        //                     deviceId: 100002,
        //                     deviceName: '设备2',
        //                     variableName: '变量21',
        //                     variableDescribe: 2,
        //                     SN: 1,
        //                     ID: 1,
        //                     mapVariable: 1222
        //                 },
        //                 {
        //                     deviceId: 100002,
        //                     deviceName: '设备2',
        //                     variableName: '变量22',
        //                     variableDescribe: 2,
        //                     SN: 1,
        //                     ID: 1,
        //                     mapVariable: 1222
        //                 }
        //             ]
        //         }
        //     }
        // ];
    },
    methods: {
        saveModel (params) {
            this.specialObj.row.mapVariable = params.row.variableName
            this.showModal = false
        },
        synchroData (data) {
            this.synchro_loading = true
            setTimeout(() => {
                this.synchro_loading = false
            }, 1000)
        },
        modalSynchroData () {
            this.modal.synchro_loading = true
            setTimeout(() => {
                this.modal.synchro_loading = false
            }, 1000)
        }
        
    }
};
</script>

