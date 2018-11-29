<style lang="less">
    @import './tree.less';
</style>
<template>
    <div>
        <Tree :data="treeList" style="width: 100%" ></Tree>
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
                <Button v-if="isSaveBtn" type="primary" :disabled="modal.disabledBut" :loading="modal.saveModalLoading" @click="saveModal">提交</Button>
                <Button v-if="!isSaveBtn" type="primary" :loading="modal.saveModalLoading" @click="updModel">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'myTree',
    props:{
        list: Array,
        isRightAction: {
            type: Boolean,
            default: false
        },
        parentAction: Array,
        childAction: Array,
        form: Array,
        modalFormValidate: Object
    },
    data () {
        return {
            treeList: [],
            isSaveBtn: true,
            showModal: false,
            specialObj: {},
            modal: {
                modalTitle: '',
                disabledBut: true,
                saveModalLoading: false
            },
            modalForm: {}
        }
    },
    watch: {
        'modalForm.ipAndPost' (val, oldVal) {
            if (val !== oldVal) {
                this.$nextTick(() => {
                    this.modal.disabledBut = true
                })
            }
        }
    },
    mounted () {
        this.treeList = this.getChild(this.list)
        if (typeof this.form !== 'undefined') {
            this.form.map(one => {
                this.modalForm[one.key] = ''
            })
        }
    },
    methods: {
        getChild (list) {
            let datas = []
            list.map(one => {
                let item = {
                    id: one.id,
                    parentID: one.parentID,
                    title: one.title,
                    expand: true,
                    isSelected: one.isSelected,
                    isActionShow: one.isActionShow,
                    isHover: one.isHover,
                    render: (h, { root, node, data }) => {
                        let iconType = 'paper'
                        if (data.parentID === 0 || (typeof data.children !== 'undefined' && data.children.length)) { 
                            iconType = 'folder'
                        }
                        let actionType = []
                        if (this.isRightAction) {
                            actionType = this.parentAction
                            // 子项的操作
                            if (data.parentID !== 0) {
                                actionType = this.childAction
                            }
                        }
                    
                        return  this.setRender(h, { root, node, data }, iconType, actionType) 
                    }
                }
                if (typeof one.children !== 'undefined') {
                    item.children = this.getChild(one.children)
                }
                datas.push(item)
            })
            return datas
        },
        filterList (list) {
            list.map(one => {
                one.isSelected = false
                if (typeof one.children !== 'undefined' && one.children.length > 0) {
                    this.filterList(one.children)
                }
            })
            return list
        },
        setRender (h, obj, iconType, actionType) {
            let data = obj.data
            // 设置是父子级图标
            let iconTag = ''
            if (iconType === 'folder') {
                iconTag =  h('Icon', {
                    props: {
                        type: 'ios-folder-outline'
                    },
                    style: {
                        marginRight: '8px'
                    }
                })
            } else if (iconType === 'paper') {
                iconTag =  h('Icon', {
                    props: {
                        type: 'ios-paper-outline'
                    },
                    style: {
                        marginRight: '8px'
                    }
                })
            }
            // 判断是否有左侧的操作按钮
            let childAction = ''
            if (this.isRightAction) {
                childAction =  h('a', {
                    attrs:{
                        title: actionType[0].title
                    },
                    style:{
                        display: data.isSelected || data.isHover ? 'block' : 'none'
                        // display: data.isSelected ? 'block' : 'none'
                    },
                    on: {
                        click: () => {
                            event.cancelBubble = true
                            data.isActionShow = false
                            this.emitFun(actionType[0].registerFuntion, obj, actionType[0].title)
                        }
                    }
                }, [h('Icon',{
                        props: {
                            type: 'plus-round',
                            color: data.isHover && !data.isSelected  ? '#2d8cf0' : '#fff'
                        }
                    })]
                );
                if (actionType.length > 1) {
                    let actions = []
                    actionType.map(one => {
                        let two = h('a',{
                            on: {
                                click: () => {
                                    event.cancelBubble = true
                                    this.emitFun(one.registerFuntion, obj)
                                }
                            }
                        }, one.title)
                        actions.push(two)
                    })
                    childAction = h('a', {
                        attrs:{
                            title:'操作'
                        },
                        style:{
                            display: data.isSelected || data.isHover ? 'block' : 'none'
                            // display: data.isSelected ? 'block' : 'none'
                        },
                        on: {
                            click: () => {
                                event.cancelBubble = true
                                // 获取点击的状态 为空没有选中,
                                if (data.isActionShow) {
                                    data.isActionShow = false
                                } else {
                                    data.isActionShow = true
                                }
                            }
                        }
                    },[
                        h('div',{
                            style:{
                                display: data.isActionShow ? 'block' : 'none'
                            },
                            class: 'tree-action-box'
                        }, actions),
                        h('img',{
                            attrs: {
                                src: data.isHover ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAbAgMAAAAMrzcMAAAADFBMVEUAAAB/pdN+pdJ9pNEAUaZLAAAAA3RSTlMAhfOYNgt2AAAAFUlEQVQI12NgIB5Igkk9JDa1ZPEBAFziASEt5lMRAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAbAgMAAAAMrzcMAAAADFBMVEUAAAD///////////84wDuoAAAABHRSTlMAQ3qA+SdHXwAAABVJREFUCNdjYCAeSIJJPSQ2tWTxAQBc4gEhLeZTEQAAAABJRU5ErkJggg=='
                            },
                            style:{
                                width: '100%',
                                height: '100%'
                            }
                        })
                    ]);
                }
            }
            return  h('span', {
                    class: 'tree-row',
                    style: {
                        color: data.isSelected ? '#fff' : '',
                        background: this.getBackground(data)
                    },
                    on: {
                        click: () => {
                            // 遍历数组变成未选中的状态
                            this.treeList = this.filterList(this.treeList)
                            // 获取点击的状态 为空没有选中,
                            data.isActionShow = false
                            data.isSelected = true
                            this.emitFun('clickFun', obj)
                        },
                        mouseenter: () => {
                            data.isHover = true
                        },
                        mouseleave: () => {
                            data.isHover = false
                            data.isActionShow = false
                        }
                    }
                }, [
                    iconTag,
                    data.title, 
                    childAction
                ]
            )
        },
        getBackground(data) {
            let flag = false
            if (data.isHover && !data.isSelected) {
                return 'rgb(237,241,245)'
            } else if (data.isSelected){
                return '#2d8cf0'
            } else {
                return ''
            }
        },
        emitFun (funName, obj, tit) {
            if (funName === 'fun' || funName === 'clickFun') {
                this.$emit(funName, obj.data);
            } else {
                this[funName](obj, tit);
            }    
        }, 
        addObj (obj, tit) {
            this.isSaveBtn = true
            let data = obj.data
            if (typeof tit === 'undefined') {
                tit = '添加子分组'
            }
            this.modal.modalTitle = '添加组'
            if (typeof data.title !== 'undefined') {
                this.modal.modalTitle = '<span>' + data.title + '</span> ' + tit
            }
            this.modalForm = {
                name: '',
                ipAndPost: '',
                acquisitionCycle: '',
                describe: ''
            }
            this.specialObj = data
            this.showModal = true
        },
        updObj (obj) {
            let data = obj.data
            this.modal.modalTitle = '<span>修改' + data.title + '</span>'
            this.specialObj = data
            this.modalForm = {
                name: data.title,
                ipAndPost: '',
                acquisitionCycle: '',
                describe: ''
            }
            this.isSaveBtn = false
            this.showModal = true
        },
        delObj (obj) {
            let root = obj.root
            let node = obj.node
            let data = obj.data
            if (typeof data.children === 'undefined' || !data.children.length) {
                this.$Modal.confirm({
                    title: '操作提示',
                    content: '删除' + data.title + '后将不可恢复，您确定要删除该信息吗',
                    onOk: () => {
                        const parentKey = root.find(el => el === node).parent;
                        const parent = root.find(el => el.nodeKey === parentKey).node;
                        const index = parent.children.indexOf(data);
                        parent.children.splice(index, 1);
                        this.$Message.success('删除成功');
                    },
                    onCancel: () => {
                    }
                });
            } else {
                this.$Modal.warning({
                    title: '操作提示',
                    content: '该节点下存在子节点，不允许删除！'
                });
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
