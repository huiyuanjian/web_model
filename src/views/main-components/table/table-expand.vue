<template>
    <Table class="expand-table" border :columns="row.list.tit" :data="row.list.data" :show-header="false"></Table>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        mounted () {
            let s = document.querySelector('.xrTable')
            console.log(s)
        }
    };
</script>
<style>
.mm-box > .ivu-table-wrapper >.ivu-table > .ivu-table-body > table > tbody> tr > td:last-child > .ivu-table-cell,
.mm-box > .ivu-table-wrapper >.ivu-table > .ivu-table-header> table > thead> tr > th:last-child > .ivu-table-cell,
.mm-box .ivu-table-with-fixed-top > .ivu-table-header > table > thead > tr > th:nth-last-child(2) > .ivu-table-cell{
    padding: 0;
    border: none;
}
.mm-box .ivu-table-with-fixed-top > .ivu-table-header > table > thead > tr > th:nth-last-child(2) > .ivu-table-cell{
    padding-left: 0;
    border: none;
}
.mm-box table > tbody> tr > td:last-child,
.mm-box table > thead> tr > th:last-child,
.mm-box .ivu-table-with-fixed-top > .ivu-table-header > table > thead > tr > th:nth-last-child(2){
    border-right: none;
}
.mm-box table > tbody> tr > td:last-child > .ivu-table-cell table,
.mm-box table > thead> tr > th:last-child > .ivu-table-cell table,
.mm-box .ivu-table-with-fixed-top > .ivu-table-header > table > thead > tr > th:nth-last-child(2) .ivu-table-cell table{
    padding: 0;
    border: none;
}
.mm-box table > tbody> tr > td:last-child > .ivu-table-cell .ivu-table-wrapper,
.mm-box table > thead> tr > th:last-child > .ivu-table-cell .ivu-table-wrapper,
.mm-box .ivu-table-with-fixed-top > .ivu-table-header > table > thead > tr > th:nth-last-child(2) .ivu-table-cell .ivu-table-wrapper{
    border:none;
}
.mm-box .expand-table table > tbody> tr > td:last-child > .ivu-table-cell .ivu-col{
    padding:0;
}
.mm-box .expand-table table > tbody> tr > td:last-child > .ivu-table-cell .ivu-table:after, .ivu-table:before{
    background: none;
    height: 0;
}
.mm-box table > tbody> tr > td:last-child > .ivu-table-cell  .ivu-table-border tr:last-child td,
.mm-box table > thead> tr > th:last-child > .ivu-table-cell .ivu-table th,
.mm-box .ivu-table-with-fixed-top > .ivu-table-header > table > thead > tr > th:nth-last-child(2) > .ivu-table-cell .ivu-table th{
    border-bottom: none;
}
.mm-box table > tbody> tr > td:last-child > .ivu-table-cell  .ivu-table-border tr td:last-child{
    border-right: none;
}
.xrTable tbody, .modal-foo-cancel .ivu-modal-footer{
    display: none;
}
</style>
