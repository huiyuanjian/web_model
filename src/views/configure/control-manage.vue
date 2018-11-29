<template>
    <div class="warp-main">
        <Card>
            <h4 class="title-h4"  slot="title">
                <Icon type="ios-paper-outline"></Icon> 控制接口管理
            </h4>
            <Row style="margin-bottom: 10px;">
                <Col span="24">
                    <Input placeholder="搜索控制接口服务名称" style="width: 200px" />
                    <Input placeholder="搜索物联网接口服务名称" style="width: 200px" />
                    <Input placeholder="ID" style="width: 200px" />
                    <!-- <Select  style="width:120px;text-align:left" placeholder="请选择状态..." v-model="search_status">
                        <Option v-for="item in search_status_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> -->
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
             <!--     <Form>
                     <FormItem label="心跳间隔：" >
                        <div style="display:inline-block;width:300px;">
                            <i-input>
                                <span slot="append">(s)</span>
                            </i-input>
                        </div>
                    </FormItem>
                </Form>
            </Row>
            <Row style="border-top: 1px solid #ccc;padding-top: 15px;margin-top:-20px;"> -->
                <Col span="10"  offset="1">
                    <div class="border-right">
                        <div class="tree-box" style="min-height: 300px;">
                            <RadioGroup v-model="checkedObj" vertical @on-change="pushList">
                                <Radio :label="item.id" v-for="(item, i) in list" :key="i">
                                    <span>{{item.title}}</span>
                                </Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </Col> 
                <Col span="10"  offset="2">
                    <div class="checked-box">
                         <p v-for="(item, i) in checkedList" :key="i">
                            <Tag type="dot" color="blue">
                                {{item.title}}
                            </Tag>
                            <!-- <Tag type="dot" color="blue" closable @on-close="handleClose('checkedList', item.id, 'id')">
                                {{item.title}}
                            </Tag> -->
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

import {controlTit, controlData} from '../datas/tableData.js';
export default {
    name: '',
    data () {
        return {
            checkedObj: '',
            checkedList: [],
            list:[],
            fruit: [],
            modalSeting: false,
            InternetTit: [{
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
                                    this.checkedObj = ''
                                    this.checkedList = []
                                    this.modalSeting = true
                                }
                            }
                            }, '配置')
                            // h('Button', {
                            //     props: {
                            //     type: 'error',
                            //     size: 'small'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.remove(params.index)
                            //         }
                            //     }
                            //     }, '详情')
                            ]);
                        }
                    }
                ],
            InternetData: controlData,
            pageIndex: 1,
            totalItemCount: 0,
            pageSize: 2,
            search_status: 0,
            search_status_list: [
                { value: 0, label:'请选择'},
                { value: 1, label:'在线'},
                {value: 2, label:'连线'},
                {value: 3, label:'尝试中'}
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
        pushList (id) {
            this.list.map(one => {
                if (id === one.id) {
                    this.checkedList = [{
                        id: one.id,
                        title: one.title
                    }]
                }
            })
            // if (this.checkedList.length && this.checkedList[0].id === data.id) {
            //     this.checkedList = []
            // } else {
            //     this.checkedList = [{
            //         id: data.id,
            //         title: data.title
            //     }]
            // }
        },
        handleClose (listName, id, colName) {
            this[listName].map((one, i) => {
                if (one[colName] === id) {
                    this[listName].splice(i, 1);
                }
            })
        }
    }
};
</script>
