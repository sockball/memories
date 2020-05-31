<template>
    <div>
        <table class='table'>
            <tr style='border: none'>
                <th>
                    <span class='left'>0</span>
                    <span class='right'>15</span>
                </th>
                <th>
                    <span class='left'>16</span>
                    <span class='right'>31</span>
                </th>
            </tr>
            <tr>
                <td colspan='2'>32位域名</td>
            </tr>
            <tr>
                <td style='width: 50%'>16位类型</td>
                <td>16位类</td>
            </tr>
            <tr>
                <td colspan='2'>32位生存时间</td>
            </tr>
            <tr>
                <td>16位资源数据长度</td>
                <td style='background: #abd1c6;border-bottom: 1px solid #abd1c6'></td>
            </tr>
            <tr>
                <td colspan='2'>资源数据（长度可变）</td>
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
