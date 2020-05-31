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
                <td>16位标识</td>
                <td>16位标志</td>
            </tr>
            <tr>
                <td>16位问题个数</td>
                <td>16位应答资源记录个数</td>
            </tr>
            <tr>
                <td>16位授权资源记录数目</td>
                <td>16位额外的资源记录数目</td>
            </tr>
            <tr>
                <td colspan='2'>查询问题（长度可变）</td>
            </tr>
            <tr>
                <td colspan='2'>应答（资源记录数目可变，长度可变）</td>
            </tr>
            <tr>
                <td colspan='2'>授权（资源记录数目可变，长度可变）</td>
            </tr>
            <tr>
                <td colspan='2'>额外信息（资源记录数目可变，长度可变）</td>
            </tr>
            <tr>
                <td colspan='2' style='background: #004643;color: #fff'>DNS查询和应答报文</td>
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
