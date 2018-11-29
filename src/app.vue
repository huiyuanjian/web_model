<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    };
</script>

<style>
.btn-box {
    text-align: right;
    margin-top: 20px;
}
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
.warp-main > .ivu-card{
    position:absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    background: white;
    overflow: auto;
}
.warp-main > .ivu-card >.ivu-card-head {
    display: none;
}
.page-position{
    margin:20px auto 0;
    float:right
}
.bb-box .ivu-btn-large{
    font-size: 13px;
    padding: 6px 12px 7px;
}
.d-form .ivu-form-item{
    margin-bottom: 0;
}
.border-right {
    border-right: 1px solid #dddee1;
    padding-right: 35px;
}
.tree-box ul li{
    cursor: pointer;
}
.form-row{
    display: inline-block;
    width: 90%;
}
.modal-tit span{
    color:#2D8CF0
}
.form-row-inputs .ivu-input-wrapper{
    display: inline-block;
    width: 16.3%;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.mm-box .ivu-table-wrapper{
    border-bottom: 1px solid #dddee1
}
.ivu-table-wrapper .ivu-table-wrapper{
    border-bottom: none;
}
</style>
