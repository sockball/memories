<template>
    <div>
        <table class='table'>
            <tr style='border: none'>
                <th colspan='16'>
                    <span class='left'>0</span>
                    <span class='right'>15</span>
                </th>
                <th colspan='16'>
                    <span class='left'>16</span>
                    <span class='right'>31</span>
                </th>
            </tr>
            <tr>
                <td colspan='4' style='width: 12.5%'>4位版本号</td>
                <td colspan='8' style='width: 25%'>8位通信类型</td>
                <td colspan='20' style='width: 25%'>20位流标签</td>
            </tr>
            <tr>
                <td colspan='16' style='width: 50%'>16位净荷长度</td>
                <td colspan='8' style='width: 25%'>8位下一个报头</td>
                <td colspan='8'>8位跳数限制</td>
            </tr>
            <tr>
                <td colspan='32'>128位源端IP地址</td>
            </tr>
            <tr>
                <td colspan='32'>128位目的端IP地址</td>
            </tr>
            <tr>
                <td colspan='32' style='background: #004643;color: #fff'>IPv6固定头部结构（40字节）</td>
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
