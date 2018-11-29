<template>
    <div class="warp-main">
        <Card>
            <h4 class="title-h4"  slot="title">
                <Icon type="ios-paper-outline"></Icon> 设备监控管理
            </h4>
            <Row style="margin-bottom: 10px;">
                <Col span="24">
                    <Input placeholder="搜索分发接口服务名称" style="width: 200px" />
                    <Input placeholder="ID" style="width: 200px" />
                    <Select  style="width:120px;text-align:left" placeholder="请选择" v-model="search_status">
                        <Option v-for="item in search_status_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button type="primary" size="large">查询</Button>
                    <Button type="default" size="large">清空</Button>
                </Col>
                <!-- <Col  span="12" style="text-align: right">
                    <Button type="primary" size="large"><Icon type="ios-add"></Icon> 新增</Button>
                </Col> -->
            </Row>
            <Row :gutter="10">
                <Col span="24">
                    <Table  border :columns="InternetTit" :data="InternetData"></Table>
                    <Page class="page-position" :current="pageIndex" :total="totalItemCount" show-total :page-size='pageSize'></Page>
                </Col>
            </Row>
        </Card>
        <Modal v-model="modalSeting" :closable='false' :mask-closable=false :width="600">
            <h3 slot="header" style="color:#2D8CF0">配置接口</h3>
            <Row>
                <Col span="10"  offset="1">
                    <div class="border-right">
                        <div class="tree-box" style="min-height: 300px;">
                            <CheckboxGroup v-model="checkedObj" @on-change="pushList">
                                <Checkbox :label="item.id" v-for="(item, i) in list" :key="i" style="display:block;line-height: 30px;">
                                    <span>{{item.title}}</span>
                                </Checkbox>
                            </CheckboxGroup>
                        </div>
                    </div>
                </Col> 
                <Col span="10"  offset="2">
                    <div class="checked-box">
                         <p v-for="(item, i) in checkedList" :key="i">
                            <Tag type="dot" color="blue" closable @on-close="handleClose('checkedList', item.id, 'id')">
                                {{item.title}}
                            </Tag>
                        </p>
                    </div>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="text" @click="modalSeting = false">取消</Button>
                <Button type="primary"  @click="modalSeting = false">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

import {distributionData, distributionTit} from '../datas/tableData.js';
export default {
    name: '',
    data () {
        return {
            checkedObj: [],
            modalSeting: false,
            checkedList: [],
            list:[],
            InternetTit: [{
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
                        this.modalSeting = true
                    }
                }
                }, '配置')
                ]);
            }
        }
    ],
            InternetData: distributionData,
            pageIndex: 1,
            totalItemCount: 0,
            pageSize: 2,
            search_status: '',
            search_status_list: [
                // { value: 0, label:'请选择'},
                { value: 1, label:'已经下发'},
                {value: 2, label:'未下发'}
            ],
        };
    },
    mounted () {
        this.totalItemCount =   this.InternetData.length
        for (let i = 0; i< 10; i++) {
            this.list.push({
                id: i + 1,
                title: '物联网接口' + (i + 1)
            })
        }
    },
    methods: {
        pushList (data) {
            let d = data.join(',')
            this.checkedList = [] 
            this.list.map(one => {
                if (d.indexOf(one.id) >= 0) {
                    this.checkedList.push({
                        id: one.id,
                        title: one.title
                    })
                }
            })
        },
        handleClose (listName, id, colName) {
            this.checkedObj.map((one, i) => {
                if (one === id) {
                    this.checkedObj.splice(i, 1);
                }
            })
            this[listName].map((one, i) => {
                if (one[colName] === id) {
                    this[listName].splice(i, 1);
                }
            })
        },
        isHaveID (list,id,idName) {
            let flag = false
            this[list].map(one => {
                if(one[idName] === id) {
                    flag = true
                }
            })
            return flag
        },
        clearIDGetList (list,id,idName){
            let arr = []
            this[list].map(one => {
                if(one[idName] !== id) {
                    arr.push(one)
                }
            })
            return arr
        }
    }
};
</script>
