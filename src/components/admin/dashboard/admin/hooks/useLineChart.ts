// chartOptions.js
import {list} from './useStatistics'

export const lineChartOptions = async (begin, end) => {
    const statisticsRes = await list(begin, end)
    return {
        title: {
            text: '网站数据统计'
        },
        /* 提示框, 当鼠标悬浮在坐标上时触发 */
        tooltip: {
            trigger: 'axis'
        },
        /* 标题右侧提示 */
        legend: {
            data: ['注册人数', '登录人数', '视频播放数', '新增课程数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        /* 右上角的工具栏, 可以下载图片 */
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: statisticsRes.dateCalculatedList
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '注册人数',
                type: 'line',
                stack: '总量',
                data: statisticsRes.registerNumList
            },
            {
                name: '登录人数',
                type: 'line',
                stack: '总量',
                data: statisticsRes.videoViewNumList
            },
            {
                name: '视频播放数',
                type: 'line',
                stack: '总量',
                data: statisticsRes.videoViewNumList
            },
            {
                name: '新增课程数',
                type: 'line',
                stack: '总量',
                data: statisticsRes.courseNumList
            }
        ]
    }
}
