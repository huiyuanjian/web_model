<template>
    <div class="warp-main">
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                {{$route.query.type === 'upd'? '修改物联网接口' : '添加物联网接口'}}
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="名称：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input placeholder="请输入角色名称" v-model="userForm.name" ></Input>
                        </div>
                    </FormItem>
                     <FormItem label="描述：">
                        <div style="display:inline-block;width:300px;">
                            <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注信息"></Input>
                            <!-- <Textarea placeholder="请输入备注信息 " v-model="userForm.name" ></Textarea> -->
                        </div>
                    </FormItem>
                    
                     <FormItem label="IP和端口号" prop="ipNumber"  v-if="$route.query.type !=='upd'" >
                        <div style="font-size: 16px;font-weight: bold;">
                            <Input  v-model="userForm.ipNumber" style="width: 100px;"></Input> .
                            <Input  v-model="userForm.ipNumber" style="width: 100px;"></Input> .
                            <Input  v-model="userForm.ipNumber" style="width: 100px;"></Input> .
                            <Input  v-model="userForm.ipNumber" style="width: 100px;"></Input> :
                            <Input  v-model="userForm.ipNumber" style="width: 100px;"></Input>
                        </div>
                    </FormItem>
                     <!-- <FormItem label="心跳间隔：" >
                        <div style="display:inline-block;width:300px;">
                            <i-input>
                                <span slot="append">(s)</span>
                            </i-input>
                        </div>
                    </FormItem> -->
                    <div v-if="$route.query.type==='upd'">
                         <FormItem label="IP和端口号：">
                            <div style="display:inline-block;width:300px;">
                                192.168.1.1:8080
                            </div>
                        </FormItem>
                        <FormItem label="创建者：">
                            <div style="display:inline-block;width:300px;">
                                Admin
                            </div>
                        </FormItem>
                            <FormItem label="创建时间：">
                            <div style="display:inline-block;width:300px;">
                                2018-05-19 14:00:32
                            </div>
                        </FormItem>
                            <FormItem label="修改者：">
                            <div style="display:inline-block;width:300px;">
                                Admin
                            </div>
                        </FormItem>
                            <FormItem label="修改时间：">
                            <div style="display:inline-block;width:300px;">
                                2018-05-19 14:00:32
                            </div>
                        </FormItem>
                    </div>
                    <div  v-if="$route.query.type !=='upd'">
                        <!-- <Button type="default" style="width: 100px;" @click="cancelEditUserInfor">取消</Button> -->
                        <Button :disabled="!disabledBut" type="primary" style="margin-left:100px;width: 100px;"  @click="testIp">测试链接</Button>
                        <Button :disabled="disabledBut" type="primary" style="width: 100px;"  @click="saveEdit">确定</Button>
                    </div>
                     <div  v-else>
                        <Button  type="primary" style="margin-left:100px;width: 100px;"  @click="saveEdit">确定</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">功能权限</h3>
            <Tree :data="searchList" show-checkbox></Tree>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            disabledBut: true,
            switch1: true,
            searchList: [{
                title: '系统管理',
                expand: true,
                children: [
                    {
                        title: '管理员管理',
                        expand: true,
                        children: [
                            {
                                title: '查看'
                            },
                            {
                                title: '新增'
                            },
                            {
                                title: '修改'
                            },
                            {
                                title: '删除'
                            }
                        ]
                    },
                    {
                        title: '角色管理',
                        expand: true,
                        children: [
                            {
                                title: '查看'
                            },
                            {
                                title: '新增'
                            },
                            {
                                title: '修改'
                            },
                            {
                                title: '删除'
                            }
                        ]
                    }
                ]
            }],
            userForm: {
                name: '',
                cellphone: '',
                company: '',
                department: '',
                ipNumber: ''
            },
            uid: '', // 登录用户的userId
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            identifyError: '', // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false, // 验证码是否正确
            hasGetIdentifyCode: false, // 是否点了获取验证码
            canGetIdentifyCode: false, // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ],
                ipNumber: [
                    { required: true, message: '请输入Ip和端口号' }
                ],
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码' // “获取验证码”按钮的文字
        };
    },
    methods: {
        testIp () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    setTimeout(() => {
                        this.$Message.success('测试链接成功');
                        this.disabledBut = false
                    }, 1000);
                }
            });
        },
        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                    // you can write ajax request here
                }
            });
        },
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit () {
            this.$router.push({
                name: 'configure-interface-manage'
            })
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;
                    // you can write ajax request here
                }
            });
        },
        init () {
            if (this.$route.query.type === 'upd') {
                this.disabled = true
            }
            // this.userForm.name = 'Lison';
            // this.userForm.cellphone = '17712345678';
            // this.initPhone = '17712345678';
            // this.userForm.company = 'TalkingData';
            // this.userForm.department = '可视化部门';
        },
        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error('请填写短信验证码');
            } else {
                setTimeout(() => {
                    this.$Message.success('验证码正确');
                    this.inputCodeVisible = false;
                    this.checkIdentifyCodeLoading = false;
                }, 1000);
            }
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        saveInfoAjax () {
            this.save_loading = true;
            this.disabled = true
            setTimeout(() => {
                this.$Message.success('成功');
                this.save_loading = false;
            }, 1000);
        }
    },
    mounted () {
        this.init();
    },
    watch: {
        'userForm.ipNumber' (val, oldVal) {
            if (val !== oldVal) {
                this.$nextTick(() => {
                    this.disabledBut = true
                });
                
            }
        }
    }
};
</script>
