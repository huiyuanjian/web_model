<template>
    <div :style="styleObj">
        
    </div>
</template>

<script>
export default {
    name: 'mapDataTable',
    data () {
        return {
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
            ]
        };
    },
    props: {
        cityData: Array,
        styleObj: Object,
        height: String
    },
    methods: {
        goDetail (row) {
           alert(22)
        }
    }
};
</script>
