const React = require('react');
const ReactDOM = require('react-dom');
const InnerHTML = require('../index')

const html = `
<link rel="stylesheet" type="text/css" href="/test/assets/tipped.css"/>
<style type="text/css">
    #demo-page {
        line-height: 1.2em;
        width: 600px;
        clear: both;
    }

    #demo-page table {
        width: 100%;
        border-collapse: collapse;
    }

    #demo-page table, #demo-page th, #demo-page td {
        border: 1px solid black;
    }

    span.success {
        background-color: lightgreen;
    }

    span.fail {
        background-color: pink;
    }
</style>
<div id="demo-page">
    <div>
        结果:
                    <span class="box success" title="success" data-tipped-options="position: 'top'">成功</span>
            </div>
    <div>完成: true</div>
    <table>
        <thead>
        <tr>
            <th>字段</th>
            <th>值</th>
        </tr>
        </thead>
        <tbody>

                        <tr>
                <td>key2</td>
                <td>val2</td>
            </tr>
                        <tr>
                <td>key1</td>
                <td>val1</td>
            </tr>
                    </tbody>
    </table>
</div>
<script type="text/javascript" src="/test/assets/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="/test/assets/tipped.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        Tipped.create('#demo-page .box');
    });
</script>

<script src="https://a.alipayobjects.com/g/datavis/g2/2.3.5/g2.js"></script>
<div style="clear:both;">
    <div id="demo-g2"></div>
</div>
<script>
    var data = [
        {genre: 'Sports', sold: 275},
        {genre: 'Strategy', sold: 115},
        {genre: 'Action', sold: 120},
        {genre: 'Shooter', sold: 350},
        {genre: 'Other', sold: 150},
    ];
    // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    // Step 1: 创建 Chart 对象
    var chart = new G2.Chart({
        id: 'demo-g2', // 指定图表容器 ID
        width: 600, // 指定图表宽度
        height: 300 // 指定图表高度
    });
    // Step 2: 载入数据源,定义列信息
    chart.source(data, {
        genre: {
            alias: '游戏种类' // 列定义，定义该属性显示的别名
        },
        sold: {
            alias: '销售量'
        }
    });
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('genre*sold').color('genre')
    // Step 4: 渲染图表
    chart.render();
</script>
`

ReactDOM.render(<InnerHTML html={html} />, document.getElementById('world'));
