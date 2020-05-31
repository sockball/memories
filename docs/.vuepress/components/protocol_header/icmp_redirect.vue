<template>
    <div>
        <table class='table'>
            <tr style='border: none'>
                <th colspan='2'>
                    <span class='left'>0</span>
                    <span class='right'>15</span>
                </th>
                <th colspan='2'>
                    <span class='left'>16</span>
                    <span class='right'>31</span>
                </th>
            </tr>
            <tr>
                <td style='width: 25%'>8位类型</td>
                <td style='width: 25%'>8位代码</td>
                <td colspan='2'>16位校验和</td>
            </tr>
            <tr>
                <td colspan='4'>应该使用的32位路由器IP地址</td>
            </tr>
            <tr>
                <td colspan='4'>原始IP数据报的头部信息（包括可选字段）+ 数据部分前8字节</td>
            </tr>
            <tr>
                <td colspan='4' style='background: #004643;color: #fff'>ICMP重定向报文</td>
            </tr>
        </table>
    </div>    
</template>

<style scoped>
    .table th {
        background: #004643;
        color: #fff;
        border: none;
    }
    .table td {
        text-align: center;
        border: 1px solid #004643;
    }
    .table .left {
        float: left;
    }
    .table .right {
        float: right;
    }
</style>
