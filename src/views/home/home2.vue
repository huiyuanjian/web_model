<template>
    <div class="warp-main">
        <Card>
            <h4 class="title-h4"  slot="title">
                <Icon type="ios-paper-outline"></Icon> 分发接口详情
            </h4>
            <Row style="margin-bottom: 10px;">
                <Col span="24">
                  
                    <Input  placeholder="搜索IOServer名称" style="width: 200px" />
                    <Input  placeholder="搜索设备名称" style="width: 200px" />
                    <Input  placeholder="搜索变量名称" style="width: 200px" />
                 
                    <Button type="primary" size="large">查询</Button>
                    <Button type="default" size="large">清空</Button>
                </Col>
                <!-- <Col  span="12" style="text-align: right">
                    <Button type="primary" size="large"><Icon type="ios-add"></Icon> 新增</Button>
                </Col> -->
            </Row>
            <Row :gutter="10">
                <Col span="24" class="mm-box">
                    <Table :columns="InternetTit" border  :data="InternetData"></Table>
                    <Page class="page-position" :current="pageIndex" :total="totalItemCount" show-total :page-size='pageSize'></Page>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import expandRow from '../main-components/table/table-expand.vue';

// import {distributiondetailsTit, distributiondetailsData} from '../datas/tableData.js';
export default {
    name: '',
    components: {
        expandRow
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
            InternetTit: [
                {
                    title: 'IOServer名称',
                    key: 'workName',
                    width: 350
                },
                {
                    title: '设备名称',
                    key: 'deviceName',
                    width: 250
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 150,
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
            pageIndex: 1,
            totalItemCount: 0,
            pageSize: 2,
            search_status: '',
            search_status_list: [
                { value: 0, label:'数据包'},
                { value: 1, label:'设备'}
            ],
        };
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

            let item1 = {
                workName: 'IOServer' + i,
                deviceName: '设备' + i,
                status: flag,
                list: {
                    tit: this.renderTable,
                    data:  child
                }
            }
            larr1.push(item1)
        }
        this.InternetData = larr1
        this.InternetData1 = larr1
    },
};
</script>
