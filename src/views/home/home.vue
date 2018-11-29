<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">

         <Row>
            <Card>
                <!-- <p slot="title" class="card-title">
                    <Icon type="map"></Icon>
                    今日服务调用地理分布
                </p> -->
                <div class="map-con">
                     <Col span="16" class="map-incon">
                        <Row type="flex" justify="center" align="middle">
                            <!-- <home-map :city-data="cityData"></home-map> -->
                             <img src="../../images/img_01.jpg" alt="" width="75%">
                             <div style="position:absolute;width: 120px;height: 113px;top: 0px;margin-left: 105px;text-align: right;" :style="showImg ? 'background:#fff' : ''" @click="showYC">
                                <img  v-show="showImg" src="../../images/icon_li_checked.png" alt="">
                                <img src="../../images/sd.gif" alt="" style="display:inline-block;position:absolute;top: 0px;margin-left: 0;">
                                <!-- <img v-show="showImg" src="../../images/img_hover.png" alt="" style="position:absolute;top: -7px;margin-left: 10px;"> -->
                             </div>
                        </Row>
                    </Col>
                    <Col span="8">
                        <Table v-if="!showChilsTable" :columns="columns" :data="cityData" @on-row-click="goDetail"></Table>
                        <Table v-if="showChilsTable"  :columns="columnsChild" :data="dataChild" ></Table>
                        <div v-if="showChilsTable" style="display: flex;align-items: center;justify-content: space-between; margin-top: 15px;">
                            <a @click="showYC">< 返回</a>
                            <Page  style="text-align: right;padding-start: 0" :current="pageIndex" :total="4" show-total :page-size='pageSize'></Page>
                        </div>
                    </Col>
                </div>
            </Card>
        </Row>
        <Row :gutter="10" class="margin-top-10">
             <Card>
                <Tabs >
                    <TabPane label="模型设备监控"  class="mm-box">
                        <Table :columns="InternetTit" border  :data="InternetData" height='391'></Table>
                    </TabPane>
                    <TabPane label="IOServer设备监控"  class="mm-box">
                        <Table :columns="InternetTit1" border  :data="InternetData1" height='391'></Table>
                        <!-- <Table :columns="index1Tit01" border   :data="index1Data01"ref="tableExcel"></Table> -->

                    </TabPane>
                </Tabs>
             </Card>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import expandRow from '../main-components/table/table-expand.vue';

import {index1Tit01, index1Data01,index1Tit02,index1Data02} from '../datas/tableData.js';
export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem,
        expandRow
    },
    mounted() {
        let larr = []
        let larr1 = []
        for (let i = 1; i < 10; i++) {
            let child = []
            let flag = 1
            for (let j = 1; j < 5; j++) {
                let one =  {
                    deviceId:  'IOServer' + i,
                    deviceName: '设备' + i,
                    variableName: '变量' + i + j,
                    variableDescribe:  (i % 2 !== 0 && j % 2 === 0)? '--.--' :  (i + '' + j) + '.' + (j + '' + i),
                    SN: 10 + i + j,
                    ID: 20 + i + j,
                    mapVariable: j % 2 === 0 ? '' : 20 + i + j
                }
                if (one.variableDescribe === '--.--') {
                    flag = 0
                }
                child.push(one)
            }
            let item = {
                workName: '安溪华工厂/污水处理区1/转速组' + i,
                deviceName: '设备' + i,
                status: flag,
                list: {
                    tit: this.renderTable,
                    data:  child
                }
            }
            let item1 = {
                workName: 'IOServer' + i,
                deviceName: '设备' + i,
                status: flag,
                list: {
                    tit: this.renderTable,
                    data:  child
                }
            }
            larr.push(item)
            larr1.push(item1)
        }
        this.InternetData = larr
        this.InternetData1 = larr1
    },
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
                    title: '变量值',
                    key: 'variableDescribe',
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.variableDescribe === '--.--' ? 'red' : '';

                        return h('span', {
                            style: {
                                color: color
                            }
                        }, row.variableDescribe);
                    } 
                }
            ],
            InternetData: [],
            InternetData1: [],
            InternetTit: [
                {
                    title: '分组名称',
                    key: 'workName',
                    width: 350
                },
                {
                    title: '设备名称',
                    key: 'deviceName',
                    width: 250,
                    filters: [
                        {
                            label: '设备1',
                            value: '设备1'
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === '设备1') {
                            return row.deviceName === '设备1';
                        } else if (value === 0) {
                            return row.deviceName === '设备1';
                        }
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 150,
                    filters: [
                        {
                            label: '正常',
                            value: 1
                        },
                        {
                            label: '异常',
                            value: 0
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.status === 1;
                        } else if (value === 0) {
                            return row.status === 0;
                        }
                    },
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
                        const text = row.status === 1 ? '正常' : row.status === 2 ? '正常' : '异常';

                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    } 
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
            InternetTit1: [
                {
                    title: 'IOServer名称',
                    key: 'workName',
                    width: 350
                },
                {
                    title: '设备名称',
                    key: 'deviceName',
                    width: 250,
                    filters: [
                        {
                            label: '设备1',
                            value: '设备1'
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === '设备1') {
                            return row.deviceName === '设备1';
                        } else if (value === 0) {
                            return row.deviceName === '设备1';
                        }
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 150,
                    filters: [
                        {
                            label: '正常',
                            value: 1
                        },
                        {
                            label: '异常',
                            value: 0
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.status === 1;
                        } else if (value === 0) {
                            return row.status === 0;
                        }
                    },
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
                        const text = row.status === 1 ? '正常' : row.status === 2 ? '正常' : '异常';

                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    } 
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
            showImg: false,
            pageIndex: 1,
            totalItemCount: 0,
            pageSize: 5,
            showChilsTable: false,
            columnsChild: [{
                title: '名称',
                key: 'name'
            },{
                title: '状态',
                key: 'status',
                filters: [
                    {
                        label: '正常',
                        value: 1
                    },
                    {
                        label: '异常',
                        value: 0
                    }
                ],
                filterMultiple: false,
                filterMethod (value, row) {
                    if (value === 1) {
                        return row.status === 1;
                    } else if (value === 0) {
                        return row.status === 0;
                    }
                },
                render: (h, params) => {
                    const row = params.row;
                    const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
                    const text = row.status === 1 ? '正常' : row.status === 2 ? '正常' : '异常';

                    return h('Tag', {
                        props: {
                            type: 'dot',
                            color: color
                        }
                    }, text);
                }    
            },{
                title: '最近一次上报时间',
                key: 'date',
                sortable: true
            }],
            dataChild: [{
                name:'物联网接口服务1',
                status: 0,
                date: '2018-05-11 12:15:12'
            },{
                name:'物联网接口服务2',
                status: 0,
                date: '2018-05-11 12:15:12'
            },{
                name:'物联网接口服务3',
                status: 0,
                date: '2018-05-11 12:15:12'
            },{
                name:'物联网接口服务4',
                status: 0,
                date: '2018-05-11 12:15:12'
            }],
            columns: [
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
                        const text = row.status === 1 ? '正常' : row.status === 2 ? '正常' : '异常';

                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    }          
                },
                {
                    title: '异常/总数',
                    key: 'num',
                    // render: (h, params) => {
                    // return h('div', [
                    //     h('Button', {
                    //         props: {
                    //         type: 'primary',
                    //         size: 'small'
                    //         },
                    //         style: {
                    //         marginRight: '15px'
                    //         },
                    //         on: {
                    //         click: () => {
                    //             this.$router.push({
                    //                 name: 'configure-map'
                    //             })
                    //         }
                    //     }
                    //     }, params.num)
                    //     ]);
                    // }
                },
                {
                    title: '最近上报时间',
                    key: 'date',
                    width: 160
                 }
            ],
            toDoList: [
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                }
            ],
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            cityData: [{
                name:'物联网接口服务',
                status: 1,
                num: '5/5',
                date: '2018-05-11 12:15:12'
            }, {
                name:'采集代理服务',
                status: 1,
                num: '10/10',
                date: '2018-05-11 12:15:12'
            }, {
                name:'队列服务',
                status: 1,
                num: '1/1',
                date: '2018-05-11 12:15:12'
            }, {
                name:'控制接口服务',
                status: 0,
                num: '4/4',
                date: '2018-05-11 12:15:12'
            }, {
                name:'分发接口服务',
                status: 1,
                num: '2/1',
                date: '2018-05-11 12:15:12'
            }],
            showAddNewTodo: false,
            newToDoItemValue: '',
            index1Tit01: index1Tit01,
            index1Data01: index1Data01,
            index1Tit02: index1Tit02,
            index1Data02: index1Data02
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        showYC () {
            this.showImg = !this.showImg
            this.showChilsTable = !this.showChilsTable 
        },
        goDetail () {
            this.showChilsTable = !this.showChilsTable
        },
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    }
};
</script>
