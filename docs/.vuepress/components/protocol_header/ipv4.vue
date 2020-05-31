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
                <td colspan='4' style='width: 12.5%'>4位头部长度</td>
                <td colspan='8' style='width: 25%'>8位服务类型（TOS）</td>
                <td colspan='16'>16位校验和</td>
            </tr>
            <tr>
                <td colspan='16' style='width: 50%'>16位标识</td>
                <td colspan='3' style='width: 9.375%'>3位标志</td>
                <td colspan='13'>13位片偏移</td>
            </tr>
            <tr>
                <td colspan='8' style='width: 25%'>8位生存时间（TTL）</td>
                <td colspan='8' style='width: 25%'>8位协议</td>
                <td colspan='13'>16位头部校验和</td>
            </tr>
            <tr>
                <td colspan='32'>32位源端IP地址</td>
            </tr>
            <tr>
                <td colspan='32'>32位目的端IP地址</td>
            </tr>
            <tr>
                <td colspan='32'>选项，最多40字节</td>
            </tr>
            <tr>
                <td colspan='32' style='background: #004643;color: #fff'>IPv4头部结构</td>
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
