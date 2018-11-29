<template>
    <div class="warp-main">
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                 {{$route.query.type !== 'control'? '配置分发接口' : '配置控制接口'}}
                
            </p>
            <div style="width: 50%;margin: 0 auto;">
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="200" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="控制接口服务名称：">
                        <div style="display:inline-block;width:300px;">
                            <Input placeholder="请输入控制接口服务名称" ></Input>
                        </div>
                    </FormItem>
                     <FormItem label="控制接口服务ID：">
                        <div style="display:inline-block;width:300px;">
                            <Input placeholder="请输入控制接口服务ID" ></Input>
                            <!-- <Textarea placeholder="请输入备注信息 " v-model="userForm.name" ></Textarea> -->
                        </div>
                    </FormItem>
                </Form>
                <div style="text-align: center;width:400px;">
                    将需要控制的物联网接口服务选到右侧：
                </div>
                <div style="margin: 20px 0;margin-left: 80px;">
                    <Transfer
                        :data="data4"
                        :target-keys="targetKeys4"
                        :render-format="render4"
                        @on-change="handleChange4"></Transfer>
                </div>
                <div class="">
                    <Button type="default" style="margin-left: 300px;width: 100px;" @click="cancelEditUserInfor">取消</Button>
                    <Button type="primary" style="width: 100px;"  @click="saveEdit">确定</Button>
                </div>
           
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
            disabled: false,
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
                department: ''
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
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ]
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
            gettingIdentifyCodeBtnContent: '获取验证码', // “获取验证码”按钮的文字
            data4: this.getMockData(),
            targetKeys4: []
        };
    },
    methods: {
        
        getMockData () {
            let mockData = [];
            for (let i = 1; i <= 5; i++) {
                mockData.push({
                    key: i.toString(),
                    label: '',
                    description: '物联网接口服务  ' + i,
                    // disabled: Math.random() * 3 < 1
                });
            }
            return mockData;
        },
        getTargetKeys () {
            return this.getMockData()
                    .filter(() => Math.random() * 2 > 1)
                    .map(item => item.key);
        },
        handleChange4 (newTargetKeys) {
            this.targetKeys4 = newTargetKeys;
        },
        render4 (item) {
            return  item.description;
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
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) { // 手机号码修改过了而且修改之后的手机号和原来的不一样
                        if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                            if (this.identifyCodeRight) { // 判断验证码是否正确
                                this.saveInfoAjax();
                            } else {
                                this.$Message.error('验证码错误，请重新输入');
                            }
                        } else {
                            this.$Message.warning('请先点击获取验证码');
                        }
                    } else {
                        this.saveInfoAjax();
                    }
                }
            });
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
    }
};
</script>
