<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                chartPie: null,
                data: [
                    {value: 335, name: '锁定已占'},
                    {value: 310, name: '锁定空闲'},
                    {value: 234, name: '开放已占'},
                    {value: 135, name: '开放空闲'}
                ],

            }
        },

        methods: {
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '教室资源图',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data:['锁定已占', '锁定空闲', '开放已占', '开放空闲']
                    },
                    label: {
                        normal: {
                            formatter: '{b}:{c}: ({d}%)',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 15
                            }
                        }
                    },
                    // label:{            //饼图图形上的文本标签
                    //     normal:{
                    //         show:true,
                    //         position:'inner', //标签的位置
                    //         textStyle : {
                    //             fontWeight : 300 ,
                    //             fontSize : 16    //文字的字体大小
                    //         },
                    //         formatter:'{d}%'
                    //     }
                    // },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(1, 1, 1, 1.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawPieChart()
            },
        },

        mounted: function () {
            const that = this;
            that.drawCharts();
            window.onresize = function() {
                that.chartPie.resize();
            };
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }

    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
