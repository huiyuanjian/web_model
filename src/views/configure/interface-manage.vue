<template>
    <div class="warp-main">
        <Card>
            <h4 class="title-h4"  slot="title">
                <Icon type="ios-paper-outline"></Icon> 物联网接口管理
            </h4>
            <Row style="margin-bottom: 10px;">
                <Col span="20">
                    <Input placeholder="搜索物联网接口名称" style="width: 200px" />
                    <Input placeholder="IP" style="width: 200px" />
                    <Select  style="width:120px;text-align:left" placeholder="请选择" v-model="search_status">
                        <Option v-for="item in search_status_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button type="primary" size="large">查询</Button>
                    <Button type="default" size="large">清空</Button>
                </Col>
                <Col  span="4" style="text-align: right">
                    <Button type="primary" size="large" @click="addMOdal"><Icon type="ios-add"></Icon> 新增</Button>
                </Col>
            </Row>
            <Row :gutter="10">
                <Col span="24">
                    <Table  border :columns="InternetTit" :data="InternetData"></Table>
                    <Page class="page-position" :current="pageIndex" :total="totalItemCount" show-total :page-size='pageSize'></Page>
                </Col>
            </Row>
        </Card>
        <Modal v-model="showModal" :closable='false' :mask-closable='false' :width="600">
            <h3 slot="header" class="modal-tit" v-html="modal.modalTitle"></h3>
            <Form 
                ref="modalForm"
                :model="modalForm" 
                :label-width="120" 
                label-position="right"
                :rules="modalFormValidate"
            >
                <FormItem v-for="(item, i) in form" :key="i" :label="item.name + ':'" :prop="item.key">
                    <div v-if="item.classParent === 'form-row'" :class="item.classParent">
                        <Input :placeholder="`请输入${item.name}`" v-model="modalForm[item.key]" :type='item.inputType'></Input>
                    </div>
                    <div v-if="item.classParent === 'form-row-inputs'" :class="item.classParent">
                        <Input :disabled="!isSaveBtn"  v-model="modalForm[item.key]"></Input> .
                        <Input :disabled="!isSaveBtn"  v-model="modalForm[item.key]"></Input> .
                        <Input :disabled="!isSaveBtn"  v-model="modalForm[item.key]"></Input> .
                        <Input :disabled="!isSaveBtn"  v-model="modalForm[item.key]"></Input> :
                        <Input :disabled="!isSaveBtn"  v-model="modalForm[item.key]"></Input>
                    </div>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="showModal = false">取消</Button>
                <Button v-if="isSaveBtn" type="primary" :disabled="!modal.disabledBut"  @click="testIpAndPost">测试连接</Button>
                <Button v-if="isSaveBtn" type="primary" :disabled="modal.disabledBut" :loading="modal.saveModalLoading" @click="showModal = false">提交</Button>
                <Button v-if="!isSaveBtn" type="primary" :loading="modal.saveModalLoading" @click="showModal = false">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

import {InternetData, InternetTit} from '../datas/tableData.js';
export default {
    name: '',
    data () {
        return {
            isSaveBtn: true,
            showModal: false,
            modal: {
                disabledBut: true,
                modalTitle: '',
                saveModalLoading: false,
                synchro_loading: false
            },
            modalForm: {},
            form: [
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
            InternetTit: [{
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
        title: 'IP',
        key: 'IP'
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
                        this.addMOdal('upd', params.row)
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
    ],
            InternetData: InternetData,
            pageIndex: 1,
            totalItemCount: 0,
            pageSize: 2,
            search_status: '',
            search_status_list: [
                // { value: 0, label:'请选择'},
                { value: 1, label:'在线'},
                {value: 2, label:'离线'}
                // {value: 3, label:'尝试中'}
            ],
        };
    },
    mounted () {
        this.totalItemCount =   this.InternetData.length
        if (typeof this.form !== 'undefined') {
            this.form.map(one => {
                this.modalForm[one.key] = ''
            })
        }
    },
    methods: {
        addMOdal (type, data) {
            console.log(data)
            this.modalForm = {
                name: '',
                ipAndPost: '',
                acquisitionCycle: '',
                describe: ''
            }
            this.showModal = true
            if (type === 'upd') {
                this.modalForm = {
                    name: data.name,
                    ipAndPost: 1,
                    acquisitionCycle: '',
                    describe: ''
                }
                this.isSaveBtn = false
                this.modal.modalTitle = '修改物联网接口'
            } else {
                this.isSaveBtn = true
                this.modal.modalTitle = '添加物联网接口'
            }
        },
        testIpAndPost () {
            this.$refs['modalForm'].validate((valid) => {
                if (valid) {
                    setTimeout(() => {
                        this.$Message.success('测试链接成功');
                        this.modal.disabledBut = false
                    }, 1000);
                }
            });
        },
        saveModal () {
            this.$refs['modalForm'].validate((valid) => {
                if (valid) {
                    this.modal.saveModalLoading = true
                    const children = this.specialObj.children || [];
                    let item = {
                        id: '12',
                        parentID: this.specialObj.id,
                        title: this.modalForm.name,
                        isSelected: false,
                        isActionShow: false,
                        isHover: false,
                        children: [],
                        render: (h, { root, node, data }) => {
                            let iconType = 'paper'
                            let actionType = []
                            if (this.isRightAction) {
                                // 子项的操作
                                if (data.parentID !== 0) {
                                    actionType = this.childAction
                                }  else {
                                    actionType = this.parentAction
                                }
                            }
                            return  this.setRender(h, { root, node, data }, iconType, actionType) 
                        }
                    }
                    children.push(item);
                    this.$set(this.specialObj, 'children', children);
                    setTimeout(() => {
                        this.$Message.success('添加成功');
                        this.modal.saveModalLoading = false
                        this.showModal = false
                    }, 1000);
                }
            });
        },
        updModel () {
            this.$refs['modalForm'].validate((valid) => {
                if (valid) {
                    this.modal.saveModalLoading = true
                    const children = this.specialObj.children || [];
                    this.specialObj.title = this.modalForm.name
                    this.$set(this.specialObj, 'data', this.specialObj);
                    setTimeout(() => {
                        this.$Message.success('修改成功');
                        this.modal.saveModalLoading = false
                        this.showModal = false
                    }, 1000);
                }
            });
        }
    }
};
</script>
